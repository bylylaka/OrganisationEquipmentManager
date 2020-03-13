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
  setOrganisationStructureIsLoading(isLoading: boolean) {
    return {
      type: ActionTypes.SET_ORGANISATION_STRUCTURE_IS_LOADING,
      isLoading
    };
  },
  setAllEquipment(allEquipment: EquipmentSimplified[]) {
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
  getAllEquipment() {
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
  createEquipment(
    buildingId: number,
    roomId: number,
    equipment: EquipmentSimplified
  ) {
    return {
      type: ActionTypes.CREATE_EQUIPMENT,
      buildingId,
      roomId,
      equipment
    };
  },
  updateEquipmentCount(
    buildingId: number,
    roomId: number,
    equipment: EquipmentSimplified
  ) {
    return {
      type: ActionTypes.UPDATE_EQUIPMENT_COUNT,
      buildingId,
      roomId,
      equipment
    };
  },
  deleteEquipment(
    buildingId: number,
    roomId: number,
    equipment: EquipmentSimplified
  ) {
    return {
      type: ActionTypes.DELETE_EQUIPMENT,
      buildingId,
      roomId,
      equipment
    };
  }
};

export default Actions;
