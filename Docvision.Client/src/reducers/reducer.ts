import ActionTypes from "../actionTypes/actionTypes";
import BuildingSimplified from "../menu/models/BuildingSimplified";
import { EquipmentsCountInfo } from "../equipmentEditor/AddEquipmentField/props";

export interface State {
  organisationStructure: BuildingSimplified[];
  equipmentsCountInfo: EquipmentsCountInfo[];
}

const initialState: State = {
  organisationStructure: [],
  equipmentsCountInfo: []
};

export const Reducer = (
  state = initialState,
  action: any //TODO: type (And for cases)
): State => {
  switch (action.type) {
    case ActionTypes.SET_ORGANISATION_STRUCTURE:
      return {
        ...state,
        organisationStructure: action.structure //TODO: add type
      };
    case ActionTypes.SET_EQUIPMENTS_COUNT_INFO:
      return {
        ...state,
        equipmentsCountInfo: action.equipmentsCountInfo //TODO: add type
      };
    default:
      return state;
  }
};

export default Reducer;
