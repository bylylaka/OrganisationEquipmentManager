import ActionTypes from "../actionTypes/actionTypes";
import BuildingSimplified from "../../GUI/menu/models/buildingSimplified";
import { AppSnackbarMessage } from "../../GUI/shared/AppSnackbar/props";
import { AnyAction } from "redux";
import EquipmentSimplified from "../../GUI/equipmentEditor/models/equipmentSimplified";

export interface State {
  organisationStructure: BuildingSimplified[];
  allEquipmentNames: EquipmentSimplified[];
  localEquipment: EquipmentSimplified[];
  appSnackbarMessage: AppSnackbarMessage;
  equipmentCreationInProgress: boolean;
}

const initialState: State = {
  organisationStructure: [],
  allEquipmentNames: [],
  localEquipment: [],
  appSnackbarMessage: {} as AppSnackbarMessage,
  equipmentCreationInProgress: false
};

export const Reducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case ActionTypes.SET_ORGANISATION_STRUCTURE:
      return {
        ...state,
        organisationStructure: action.structure
      };
    case ActionTypes.SET_ALL_EQUIPMENT_NAMES:
      return {
        ...state,
        allEquipmentNames: action.allEquipmentNames
      };
    case ActionTypes.SET_LOCAL_EQUIPMENT:
      return {
        ...state,
        localEquipment: action.localEquipment
      };
    case ActionTypes.SET_EQUIPMENT_CREATION_IN_PROGRESS:
      return {
        ...state,
        equipmentCreationInProgress: action.inProgress
      };
    case ActionTypes.SET_APPSNACKBAR_MESSAGE:
      return {
        ...state,
        appSnackbarMessage: action.message
      };
    default:
      return state;
  }
};

export default Reducer;
