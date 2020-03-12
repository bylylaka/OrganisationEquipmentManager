import { takeLatest, all } from "@redux-saga/core/effects";
import ActionTypes from "../../actionTypes/actionTypes";
import { Sagas } from "../sagas/sagas";

function* getOrganisationStructureWatcher() {
  yield takeLatest(
    ActionTypes.GET_ORGANISATION_STRUCTURE,
    Sagas.getOrganisationStructureSaga
  );
}

function* getAllEquipmentNamesWatcher() {
  yield takeLatest(
    ActionTypes.GET_ALL_EQUIPMENT_NAMES,
    Sagas.getAllEquipmentNamesSaga
  );
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

export default function* watchers() {
  yield all([
    getOrganisationStructureWatcher(),
    getAllEquipmentNamesWatcher(),
    getLocalEquipmentWatcher(),
    createEquipmentWatcher()
  ]);
}
