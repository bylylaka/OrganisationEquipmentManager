import { AppSnackbarMessage } from "../../shared/AppSnackbar/props";

export interface IAddEquipmentFieldProps {
  equipmentsCountInfo: EquipmentsCountInfo[];
  buildingId?: number;
  roomId?: number;
}

export interface IAddEquipmentFieldCallProps {
  setEquipmentsCountInfo: (info: EquipmentsCountInfo[]) => void;
  enqueAppSnackbar: (message: AppSnackbarMessage) => void;
}

export class EquipmentsCountInfo {
  constructor(name: string, count: number) {
    this.name = name;
    this.count = count;
  }
  name: string;
  count: number;
}
