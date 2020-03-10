import { takeLatest, all } from "@redux-saga/core/effects";
import ActionTypes from "../../actionTypes/actionTypes";
import { Sagas } from "./sagas";

function* testWatcher() {
  yield takeLatest(ActionTypes.SET_EQUIPMENTS_COUNT_INFO, Sagas.testSaga);
}

export default function* watchers() {
  yield all([testWatcher()]);
}
