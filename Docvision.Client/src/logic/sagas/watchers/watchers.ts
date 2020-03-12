import { takeLatest, all } from "@redux-saga/core/effects";
import ActionTypes from "../../actionTypes/actionTypes";
import { Sagas } from "../sagas/sagas";

function* getOrganisationStructureWatcher() {
  yield takeLatest(
    ActionTypes.GET_ORGANISATION_STRUCTURE,
    Sagas.getOrganisationStructureSaga
  );
}

function* getallEquipmentWatcher() {
  yield takeLatest(ActionTypes.GET_ALL_EQUIPMENT, Sagas.getallEquipmentSaga);
}

function* getLocalEquipmentWatcher() {
  yield takeLatest(
    ActionTypes.GET_LOCAL_EQUIPMENT,
    Sagas.getLocalEquipmentSaga
  );
}

function* createEquipmentWatcher() {
  yield takeLatest(ActionTypes.CREATE_EQUIPMENT, Sagas.createEquipmentSaga);
}

function* updateEquipmentCountWatcher() {
  yield takeLatest(
    ActionTypes.UPDATE_EQUIPMENT_COUNT,
    Sagas.updateEquipmentCountSaga
  );
}

function* deleteEquipmentWatcher() {
  yield takeLatest(ActionTypes.DELETE_EQUIPMENT, Sagas.deleteEquipmentSaga);
}

export default function* watchers() {
  yield all([
    getOrganisationStructureWatcher(),
    getallEquipmentWatcher(),
    getLocalEquipmentWatcher(),
    createEquipmentWatcher(),
    updateEquipmentCountWatcher(),
    deleteEquipmentWatcher()
  ]);
}
