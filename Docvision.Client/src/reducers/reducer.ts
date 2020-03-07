import ActionTypes from "../actionTypes/actionTypes";
import buildingSimplified from "../menu/models/buildingSimplified";

export interface State {
  organisationStructure: buildingSimplified[];
}

const initialState: State = {
  organisationStructure: []
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
    default:
      return state;
  }
};

export default Reducer;
