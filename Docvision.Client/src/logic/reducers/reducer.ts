import ActionTypes from "../actionTypes/actionTypes";
import BuildingSimplified from "../../GUI/menu/models/buildingSimplified";
import { EquipmentsCountInfo } from "../../GUI/equipmentEditor/AddEquipmentField/props";
import { AppSnackbarMessage } from "../../GUI/shared/AppSnackbar/props";
import { AnyAction } from "redux";

export interface State {
  organisationStructure: BuildingSimplified[];
  equipmentsCountInfo: EquipmentsCountInfo[];
  appSnackbarMessage: AppSnackbarMessage;
  equipmentCreationInProgress: boolean;
}

const initialState: State = {
  organisationStructure: [],
  equipmentsCountInfo: [],
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
    case ActionTypes.SET_EQUIPMENTS_COUNT_INFO:
      return {
        ...state,
        equipmentsCountInfo: action.equipmentsCountInfo
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
