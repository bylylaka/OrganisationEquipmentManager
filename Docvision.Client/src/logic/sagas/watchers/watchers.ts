import { takeLatest, all } from "@redux-saga/core/effects";
import ActionTypes from "../../actionTypes/actionTypes";
import { Sagas } from "../sagas/sagas";

function* getOrganisationStructureWatcher() {
  yield takeLatest(
    ActionTypes.GET_ORGANISATION_STRUCTURE,
    Sagas.getOrganisationStructureSaga
  );
}

function* getEquipmentCountInfoWatcher() {
  yield takeLatest(
    ActionTypes.GET_EQUIPMENT_COUNT_INFO,
    Sagas.getEquipmentCountInfoSaga
  );
}

function* createEquipmentWatcher() {
  yield takeLatest(ActionTypes.CREATE_EQUIPMENT, Sagas.createEquipmentSaga);
}

export default function* watchers() {
  yield all([
    getOrganisationStructureWatcher(),
    getEquipmentCountInfoWatcher(),
    createEquipmentWatcher()
  ]);
}
