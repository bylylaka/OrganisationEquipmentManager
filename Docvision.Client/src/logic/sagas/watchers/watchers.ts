import { takeLatest, all } from "@redux-saga/core/effects";
import ActionTypes from "../../actionTypes/actionTypes";
import { Sagas } from "../sagas/sagas";

function* getOrganisationStructureWatcher() {
  yield takeLatest(
    ActionTypes.GET_ORGANISATION_STRUCTURE,
    Sagas.getOrganisationStructureSaga
  );
}

export default function* watchers() {
  yield all([getOrganisationStructureWatcher()]);
}
