import { State } from "../../reducers/reducer";

const Selectors = {
  equipmentsCountInfo(state: State) {
    return state.equipmentsCountInfo;
  }
};

export default Selectors;
