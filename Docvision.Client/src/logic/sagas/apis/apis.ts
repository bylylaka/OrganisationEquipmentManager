import Axios from "axios";
import { EquipmentsCountInfo } from "../../../GUI/equipmentEditor/AddEquipmentField/props";

export const Apis = {
  getOrganisationStructure() {
    return Axios.get(`${Axios.defaults.baseURL}/organisation/structure`);
  },
  getEquipmentCountInfo() {
    return Axios.get(
      `${Axios.defaults.baseURL}/organisation/equipmentsCountInfo`
    );
  },
  createEquipment(roomId: number, equipment: EquipmentsCountInfo) {
    return Axios.post(
      `${Axios.defaults.baseURL}/organisation/AddEquipment/${roomId}`,
      equipment
    );
  }
};

export default Apis;
