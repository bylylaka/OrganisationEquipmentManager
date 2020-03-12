import ActionTypes from "../actionTypes/actionTypes";
import { AppSnackbarMessage } from "../../GUI/shared/AppSnackbar/props";
import BuildingSimplified from "../../GUI/menu/models/buildingSimplified";
import EquipmentSimplified from "../../GUI/equipmentEditor/models/equipmentSimplified";

const Actions = {
  //store actions
  setOrganisationStructure(structure: BuildingSimplified[]) {
    return {
      type: ActionTypes.SET_ORGANISATION_STRUCTURE,
      structure
    };
  },
  setallEquipment(allEquipment: EquipmentSimplified[]) {
    return {
      type: ActionTypes.SET_ALL_EQUIPMENT,
      allEquipment
    };
  },

  setLocalEquipments(localEquipment: EquipmentSimplified[]) {
    return {
      type: ActionTypes.SET_LOCAL_EQUIPMENT,
      localEquipment
    };
  },
  setAppSnackbarMessage(message: AppSnackbarMessage) {
    return {
      type: ActionTypes.SET_APPSNACKBAR_MESSAGE,
      message
    };
  },
  setEquipmentCreationInProgress(inProgress: boolean) {
    return {
      type: ActionTypes.SET_EQUIPMENT_CREATION_IN_PROGRESS,
      inProgress
    };
  },

  //saga actions
  getOrganisationStructure() {
    return {
      type: ActionTypes.GET_ORGANISATION_STRUCTURE
    };
  },
  getallEquipment() {
    return {
      type: ActionTypes.GET_ALL_EQUIPMENT
    };
  },
  getLocalEquipment(buildingId: number, roomId: number) {
    return {
      type: ActionTypes.GET_LOCAL_EQUIPMENT,
      buildingId,
      roomId
    };
  },
  createEquipment(roomId: number, equipment: EquipmentSimplified) {
    return {
      type: ActionTypes.CREATE_EQUIPMENT,
      roomId,
      equipment
    };
  }
};

export default Actions;
