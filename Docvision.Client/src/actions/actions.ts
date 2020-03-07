import ActionTypes from "../actionTypes/actionTypes";
import buildingSimplified from "../menu/models/buildingSimplified";

const Actions = {
  setOrganisationStructure(structure: buildingSimplified[]) {
    return {
      type: ActionTypes.SET_ORGANISATION_STRUCTURE,
      structure
    };
  }
};

export default Actions;
