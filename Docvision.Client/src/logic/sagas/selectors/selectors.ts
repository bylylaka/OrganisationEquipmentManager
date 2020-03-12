import { State } from "../../reducers/reducer";

const Selectors = {
  allEquipment(state: State) {
    return state.allEquipment;
  },
  localEquipmentNames(state: State) {
    return state.localEquipment;
  }
};

export default Selectors;
