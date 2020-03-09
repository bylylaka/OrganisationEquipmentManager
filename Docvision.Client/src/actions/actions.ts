import ActionTypes from "../actionTypes/actionTypes";
import { EquipmentsCountInfo } from "../equipmentEditor/AddEquipmentField/props";
import BuildingSimplified from "../menu/models/BuildingSimplified";
import { AppSnackbarMessage } from "../shared/AppSnackbar/props";

const Actions = {
  setOrganisationStructure(structure: BuildingSimplified[]) {
    return {
      type: ActionTypes.SET_ORGANISATION_STRUCTURE,
      structure
    };
  },
  setEquipmentsCountInfo(equipmentsCountInfo: EquipmentsCountInfo[]) {
    return {
      type: ActionTypes.SET_EQUIPMENTS_COUNT_INFO,
      equipmentsCountInfo
    };
  },
  setAppSnackbarMessage(message: AppSnackbarMessage) {
    return {
      type: ActionTypes.SET_AppSnackbar_MESSAGE,
      message
    };
  }
};

export default Actions;
