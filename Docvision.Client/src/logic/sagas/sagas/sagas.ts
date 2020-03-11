import Actions from "../../actions/actions";
import { call, put, select } from "@redux-saga/core/effects";
import Apis from "../apis/apis";
import { AxiosResponse } from "axios";
import BuildingSimplified from "../../../GUI/menu/models/buildingSimplified";
import { EquipmentsCountInfo } from "../../../GUI/equipmentEditor/AddEquipmentField/props";
import Selectors from "../selectors/selectors";
import { AppSnackbarMessage } from "../../../GUI/shared/AppSnackbar/props";

export const Sagas = {
  *getOrganisationStructureSaga() {
    const response: AxiosResponse<BuildingSimplified[]> = yield call(
      Apis.getOrganisationStructure
    );
    yield put(Actions.setOrganisationStructure(response.data));
  },

  *getEquipmentCountInfoSaga() {
    const response: AxiosResponse<EquipmentsCountInfo[]> = yield call(
      Apis.getEquipmentCountInfo
    );
    yield put(Actions.setEquipmentsCountInfo(response.data));
  },

  *createEquipmentSaga(action: ReturnType<typeof Actions.createEquipment>) {
    const response: AxiosResponse<EquipmentsCountInfo> = yield call(
      Apis.createEquipment,
      action.roomId,
      action.equipment
    );
    const equipmentsInfo: EquipmentsCountInfo[] = yield select(
      Selectors.equipmentsCountInfo
    );

    if (equipmentsInfo.some(e => e.name == response.data.name)) {
      let existedEquipment = equipmentsInfo.find(
        e => e.name == response.data.name
      );
      (existedEquipment as EquipmentsCountInfo).count += response.data.count;
    } else {
      equipmentsInfo.push(response.data);
    }

    yield put(Actions.setEquipmentsCountInfo(equipmentsInfo));

    yield put(
      Actions.setAppSnackbarMessage(
        new AppSnackbarMessage("Оборудование успешно добавлено.", "success")
      )
    );
  }
};
