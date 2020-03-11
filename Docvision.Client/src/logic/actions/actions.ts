import ActionTypes from "../actionTypes/actionTypes";
import { EquipmentsCountInfo } from "../../GUI/equipmentEditor/AddEquipmentField/props";
import { AppSnackbarMessage } from "../../GUI/shared/AppSnackbar/props";
import BuildingSimplified from "../../GUI/menu/models/buildingSimplified";

const Actions = {
  //store actions
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
      type: ActionTypes.SET_APPSNACKBAR_MESSAGE,
      message
    };
  },

  //saga actions
  getOrganisationStructure() {
    return {
      type: ActionTypes.GET_ORGANISATION_STRUCTURE
    };
  },
  getEquipmentCountInfo() {
    return {
      type: ActionTypes.GET_EQUIPMENT_COUNT_INFO
    };
  },
  createEquipment(roomId: number, equipment: EquipmentsCountInfo) {
    return {
      type: ActionTypes.CREATE_EQUIPMENT,
      roomId,
      equipment
    };
  }
};

export default Actions;
