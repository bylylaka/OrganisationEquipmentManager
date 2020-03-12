import Axios from "axios";
import EquipmentSimplified from "../../../GUI/equipmentEditor/models/equipmentSimplified";

export const Apis = {
  getOrganisationStructure() {
    return Axios.get(`${Axios.defaults.baseURL}/organisation/structure`);
  },
  getAllEquipmentNames() {
    return Axios.get(
      `${Axios.defaults.baseURL}/organisation/allEquipmentNames`
    );
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
  }
};

export default Apis;
