import Axios from "axios";
import EquipmentSimplified from "../../../GUI/equipmentEditor/models/equipmentSimplified";

export const Apis = {
  getOrganisationStructure() {
    return Axios.get(`${Axios.defaults.baseURL}/organisation/structure`);
  },
  getallEquipment() {
    return Axios.get(`${Axios.defaults.baseURL}/organisation/allEquipment`);
  },
  getLocalEquipment(buildingId: number, roomId?: number) {
    return Axios.get(
      `${Axios.defaults.baseURL}/organisation/localEquipment/${buildingId}/${roomId}`
    );
  },
  createEquipment(roomId: number, equipment: EquipmentSimplified) {
    return Axios.post(
      `${Axios.defaults.baseURL}/organisation/equipment/${roomId}`,
      equipment
    );
  },
  updateEquipmentCount(roomId: number, equipment: EquipmentSimplified) {
    return Axios.put(
      `${Axios.defaults.baseURL}/organisation/equipment/${roomId}`,
      equipment
    );
  },
  deleteEquipment(roomId: number, equipment: EquipmentSimplified) {
    return Axios.delete(
      `${Axios.defaults.baseURL}/organisation/equipment/${roomId}`,
      {
        data: equipment
      }
    );
  }
};

export default Apis;
