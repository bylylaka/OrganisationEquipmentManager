import Actions from "../../actions/actions";
import { call, put, select } from "@redux-saga/core/effects";
import Apis from "../apis/apis";
import { AxiosResponse } from "axios";
import BuildingSimplified from "../../../GUI/menu/models/buildingSimplified";
import Selectors from "../selectors/selectors";
import { AppSnackbarMessage } from "../../../GUI/shared/AppSnackbar/props";
import EquipmentSimplified from "../../../GUI/equipmentEditor/models/equipmentSimplified";
import RoomSimplified from "../../../GUI/menu/models/roomSimplified";

export const Sagas = {
  *getOrganisationStructureSaga() {
    const response: AxiosResponse<BuildingSimplified[]> = yield call(
      Apis.getOrganisationStructure
    );
    yield put(Actions.setOrganisationStructure(response.data));
  },

  *getallEquipmentSaga() {
    const response: AxiosResponse<EquipmentSimplified[]> = yield call(
      Apis.getallEquipment
    );
    yield put(Actions.setallEquipment(response.data));
  },

  *getLocalEquipmentSaga(action: ReturnType<typeof Actions.getLocalEquipment>) {
    const response: AxiosResponse<EquipmentSimplified[]> = yield call(
      Apis.getLocalEquipment,
      action.buildingId,
      action.roomId
    );
    yield put(Actions.setLocalEquipments(response.data));
  },

  *createEquipmentSaga(action: ReturnType<typeof Actions.createEquipment>) {
    yield put(Actions.setEquipmentCreationInProgress(true));
    try {
      const response: AxiosResponse<EquipmentSimplified> = yield call(
        Apis.createEquipment,
        action.roomId,
        action.equipment
      );

      yield call(Sagas.addToAllEuipment, response.data);
      yield call(Sagas.addToLocalEuipment, response.data);
      yield call(
        Sagas.addEquipmentToOrganisationStructure,
        action.buildingId,
        action.roomId,
        action.equipment
      );

      yield put(
        Actions.setAppSnackbarMessage(
          new AppSnackbarMessage("Оборудование успешно добавлено.", "success")
        )
      );
    } catch (exception) {
    } finally {
      yield put(Actions.setEquipmentCreationInProgress(false));
    }
  },

  *addToAllEuipment(equipment: EquipmentSimplified) {
    let allEquipment: EquipmentSimplified[] = yield select(
      Selectors.allEquipment
    );
    if (allEquipment.some(e => e.name == equipment.name)) {
      let existedEquipment = allEquipment.find(e => e.name == equipment.name);
      (existedEquipment as EquipmentSimplified).count += equipment.count;
    } else {
      allEquipment.push(equipment);
    }
    yield put(Actions.setallEquipment(allEquipment));
  },

  *addToLocalEuipment(equipment: EquipmentSimplified) {
    let localEquipment: EquipmentSimplified[] = yield select(
      Selectors.localEquipmentNames
    );
    localEquipment.push(equipment);
    yield put(Actions.setLocalEquipments(localEquipment));
  },

  *addEquipmentToOrganisationStructure(
    buildingId: number,
    roomId: number,
    equipment: EquipmentSimplified
  ) {
    let buildingsStructure: BuildingSimplified[] = yield select(
      Selectors.organisationStructure
    );
    let roomInStructure = buildingsStructure
      .find(b => b.id == buildingId)
      ?.rooms.find(r => r.id == roomId);

    (roomInStructure as RoomSimplified).equipmentCount += equipment.count;

    yield put(Actions.setOrganisationStructure(buildingsStructure));
  },

  *deleteEquipmentSaga(action: ReturnType<typeof Actions.deleteEquipment>) {
    yield call(Apis.deleteEquipment, action.roomId, action.equipment);

    yield call(Sagas.removeFromAllEuipment, action.equipment);
    yield call(Sagas.removeFromLocalEuipment, action.equipment);
    yield call(
      Sagas.removeEquipmentFromOrganisationStructure,
      action.buildingId,
      action.roomId,
      action.equipment
    );

    yield put(
      Actions.setAppSnackbarMessage(
        new AppSnackbarMessage("Оборудование успешно удалено.", "success")
      )
    );
  },

  *removeFromAllEuipment(equipment: EquipmentSimplified) {
    let allEquipment: EquipmentSimplified[] = yield select(
      Selectors.allEquipment
    );
    const foundEquipment = allEquipment.find(e => e.name == equipment.name);

    if (Number(foundEquipment?.count) > equipment.count) {
      (foundEquipment as EquipmentSimplified).count -= equipment.count;
    } else {
      allEquipment = allEquipment.filter(e => e.name != equipment.name);
    }

    yield put(Actions.setallEquipment(allEquipment));
  },

  *removeFromLocalEuipment(equipment: EquipmentSimplified) {
    let localEquipment: EquipmentSimplified[] = yield select(
      Selectors.localEquipmentNames
    );
    localEquipment = localEquipment.filter(e => e.name != equipment.name);
    yield put(Actions.setLocalEquipments(localEquipment));
  },

  *removeEquipmentFromOrganisationStructure(
    buildingId: number,
    roomId: number,
    equipment: EquipmentSimplified
  ) {
    let buildingsStructure: BuildingSimplified[] = yield select(
      Selectors.organisationStructure
    );
    let roomInStructure = buildingsStructure
      .find(b => b.id == buildingId)
      ?.rooms.find(r => r.id == roomId);

    (roomInStructure as RoomSimplified).equipmentCount -= equipment.count;

    yield put(Actions.setOrganisationStructure(buildingsStructure));
  }
};
