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
    yield put(Actions.setOrganisationStructureIsLoading(true));

    const response: AxiosResponse<BuildingSimplified[]> = yield call(
      Apis.getOrganisationStructure
    );
    yield put(Actions.setOrganisationStructure(response.data));
    yield put(Actions.setOrganisationStructureIsLoading(false));
  },

  *getallEquipmentSaga() {
    const response: AxiosResponse<EquipmentSimplified[]> = yield call(
      Apis.getallEquipment
    );
    yield put(Actions.setAllEquipment(response.data));
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

      yield call(Sagas.addToAllEquipment, response.data);
      yield call(Sagas.addToLocalEquipment, response.data);
      yield call(
        Sagas.updateEquipmentCountForOrganisationStructure,
        action.buildingId,
        action.roomId,
        action.equipment.count
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

  *addToAllEquipment(equipment: EquipmentSimplified) {
    const allEquipment: EquipmentSimplified[] = yield select(
      Selectors.allEquipment
    );
    let allEquipmentCopy = [...allEquipment];

    if (allEquipmentCopy.some(e => e.name === equipment.name)) {
      let existedEquipment = allEquipmentCopy.find(
        e => e.name === equipment.name
      );
      (existedEquipment as EquipmentSimplified).count += equipment.count;
    } else {
      allEquipmentCopy.push(equipment);
    }
    yield put(Actions.setAllEquipment(allEquipmentCopy));
  },

  *addToLocalEquipment(equipment: EquipmentSimplified) {
    const localEquipment: EquipmentSimplified[] = yield select(
      Selectors.localEquipment
    );
    let localEquipmentCopy = [...localEquipment];
    localEquipmentCopy.push(equipment);

    yield put(Actions.setLocalEquipments(localEquipmentCopy));
  },

  *updateEquipmentCountSaga(
    action: ReturnType<typeof Actions.updateEquipmentCount>
  ) {
    const localEquipment: EquipmentSimplified[] = yield select(
      Selectors.localEquipment
    );
    // let localEquipmentCopy = [...localEquipment];

    const oldEquipmentCount = localEquipment.find(
      e => e.name === action.equipment.name
    )?.count;

    const response: AxiosResponse<EquipmentSimplified> = yield call(
      Apis.updateEquipmentCount,
      action.roomId,
      action.equipment
    );
    const newEquipmentCount = response.data.count;
    const delta = newEquipmentCount - Number(oldEquipmentCount);

    yield call(Sagas.updateAllEquipment, response.data, delta);
    yield call(
      Sagas.updateLocalEquipment,
      localEquipment,
      response.data,
      delta
    );
    yield call(
      Sagas.updateEquipmentCountForOrganisationStructure,
      action.buildingId,
      action.roomId,
      delta
    );
    yield put(
      Actions.setAppSnackbarMessage(
        new AppSnackbarMessage("Значение успешно обновлено.", "success")
      )
    );
  },

  *updateAllEquipment(equipment: EquipmentSimplified, delta: number) {
    const allEquipment: EquipmentSimplified[] = yield select(
      Selectors.allEquipment
    );
    let allEquipmentCopy: EquipmentSimplified[] = JSON.parse(
      JSON.stringify(allEquipment)
    );

    (allEquipmentCopy.find(
      e => e.name === equipment.name
    ) as EquipmentSimplified).count += delta;

    yield put(Actions.setAllEquipment(allEquipmentCopy));
  },

  *updateLocalEquipment(
    localEquipments: EquipmentSimplified[],
    equipment: EquipmentSimplified,
    delta: number
  ) {
    let localEquipmentsCopy: EquipmentSimplified[] = JSON.parse(
      JSON.stringify(localEquipments)
    );

    (localEquipmentsCopy.find(
      e => e.name === equipment.name
    ) as EquipmentSimplified).count += delta;

    yield put(Actions.setLocalEquipments(localEquipmentsCopy));
  },

  *deleteEquipmentSaga(action: ReturnType<typeof Actions.deleteEquipment>) {
    yield call(Apis.deleteEquipment, action.roomId, action.equipment);

    yield call(Sagas.removeFromAllEquipment, action.equipment);
    yield call(Sagas.removeFromLocalEquipment, action.equipment);
    yield call(
      Sagas.updateEquipmentCountForOrganisationStructure,
      action.buildingId,
      action.roomId,
      -action.equipment.count
    );

    yield put(
      Actions.setAppSnackbarMessage(
        new AppSnackbarMessage("Оборудование успешно удалено.", "success")
      )
    );
  },

  *removeFromAllEquipment(equipment: EquipmentSimplified) {
    const allEquipment: EquipmentSimplified[] = yield select(
      Selectors.allEquipment
    );
    let allEquipmentCopy = [...allEquipment];
    const foundEquipment = allEquipmentCopy.find(
      e => e.name === equipment.name
    );

    if (Number(foundEquipment?.count) > equipment.count) {
      (foundEquipment as EquipmentSimplified).count -= equipment.count;
    } else {
      allEquipmentCopy = allEquipmentCopy.filter(e => e.name != equipment.name);
    }

    yield put(Actions.setAllEquipment(allEquipmentCopy));
  },

  *removeFromLocalEquipment(equipment: EquipmentSimplified) {
    const localEquipment: EquipmentSimplified[] = yield select(
      Selectors.localEquipment
    );
    let localEquipmentCopy = [...localEquipment];

    localEquipmentCopy = localEquipmentCopy.filter(
      e => e.name != equipment.name
    );
    yield put(Actions.setLocalEquipments(localEquipmentCopy));
  },

  *updateEquipmentCountForOrganisationStructure(
    buildingId: number,
    roomId: number,
    delta: number
  ) {
    const buildingsStructure: BuildingSimplified[] = yield select(
      Selectors.organisationStructure
    );
    let buildingsStructureCopy = [...buildingsStructure];
    let roomInStructure = buildingsStructureCopy
      .find(b => b.id === buildingId)
      ?.rooms.find(r => r.id === roomId);
    (roomInStructure as RoomSimplified).equipmentCount += delta;
    yield put(Actions.setOrganisationStructure(buildingsStructureCopy));
  }
};
