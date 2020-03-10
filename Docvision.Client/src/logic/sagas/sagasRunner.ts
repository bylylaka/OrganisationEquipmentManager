import { SagaMiddleware } from "redux-saga";
import watchers from "./watchers/watcher";

export default class SagasRunner {
  static run = (sagaMiddleware: SagaMiddleware) => {
    sagaMiddleware.run(watchers);
  };
}
