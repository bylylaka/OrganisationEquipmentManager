import Actions from "../../actions/actions";
import { call, put, select } from "@redux-saga/core/effects";
import Apis from "../apis/apis";
import { AxiosResponse } from "axios";
import BuildingSimplified from "../../../GUI/menu/models/buildingSimplified";
import Selectors from "../selectors/selectors";
import { AppSnackbarMessage } from "../../../GUI/shared/AppSnackbar/props";
import EquipmentSimplified from "../../../GUI/equipmentEditor/models/equipmentSimplified";

export const Sagas = {
  *getOrganisationStructureSaga() {
    const response: AxiosResponse<BuildingSimplified[]> = yield call(
      Apis.getOrganisationStructure
    );
    yield put(Actions.setOrganisationStructure(response.data));
  },

  *getAllEquipmentNamesSaga() {
    const response: AxiosResponse<EquipmentSimplified[]> = yield call(
      Apis.getAllEquipmentNames
    );
    yield put(Actions.setAllEquipmentNames(response.data));
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
    const allEquipmentNames: EquipmentSimplified[] = yield select(
      Selectors.allEquipmentNames
    );
    if (allEquipmentNames.some(e => e.name == equipment.name)) {
      let existedEquipment = allEquipmentNames.find(
        e => e.name == equipment.name
      );
      (existedEquipment as EquipmentSimplified).count += equipment.count;
    } else {
      allEquipmentNames.push(equipment);
    }
    yield put(Actions.setAllEquipmentNames(allEquipmentNames));
  },

  *addToLocalEuipment(equipment: EquipmentSimplified) {
    const localEquipment: EquipmentSimplified[] = yield select(
      Selectors.localEquipmentNames
    );
    localEquipment.push(equipment);
    yield put(Actions.setLocalEquipments(localEquipment));
  }
};
