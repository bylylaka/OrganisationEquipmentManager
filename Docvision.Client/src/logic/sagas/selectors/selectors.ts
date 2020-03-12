import { State } from "../../reducers/reducer";

const Selectors = {
  organisationStructure(state: State) {
    return state.organisationStructure;
  },
  allEquipment(state: State) {
    return state.allEquipment;
  },
  localEquipment(state: State) {
    return state.localEquipment;
  }
};

export default Selectors;
