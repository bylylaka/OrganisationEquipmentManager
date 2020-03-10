import Actions from "../../actions/actions";

export const Sagas = {
  *testSaga(action: ReturnType<typeof Actions.setEquipmentsCountInfo>) {
    console.log(action.equipmentsCountInfo);
  }
};
