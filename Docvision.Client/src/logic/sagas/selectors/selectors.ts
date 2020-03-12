import { State } from "../../reducers/reducer";

const Selectors = {
  allEquipmentNames(state: State) {
    return state.allEquipmentNames;
  },
  localEquipmentNames(state: State) {
    return state.localEquipment;
  }
};

export default Selectors;
