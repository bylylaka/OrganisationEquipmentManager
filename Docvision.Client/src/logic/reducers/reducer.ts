import ActionTypes from "../actionTypes/actionTypes";
import BuildingSimplified from "../../GUI/menu/models/buildingSimplified";
import { EquipmentsCountInfo } from "../../GUI/equipmentEditor/AddEquipmentField/props";
import { AppSnackbarMessage } from "../../GUI/shared/AppSnackbar/props";
import Actions from "../actions/actions";

export interface State {
  organisationStructure: BuildingSimplified[];
  equipmentsCountInfo: EquipmentsCountInfo[];
  AppSnackbarMessage: AppSnackbarMessage;
}

const initialState: State = {
  organisationStructure: [],
  equipmentsCountInfo: [],
  AppSnackbarMessage: {} as AppSnackbarMessage
};

type Action = ReturnType<typeof Actions.setAppSnackbarMessage> &
  ReturnType<typeof Actions.setEquipmentsCountInfo> &
  ReturnType<typeof Actions.setOrganisationStructure>;

export const Reducer = (
  state = initialState,
  action: Action //TODO: type (And for cases)
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
    case ActionTypes.SET_APPSNACKBAR_MESSAGE:
      return {
        ...state,
        AppSnackbarMessage: action.message //TODO: add type
      };
    default:
      return state;
  }
};

export default Reducer;
