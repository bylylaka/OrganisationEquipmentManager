export interface IAddEquipmentFieldProps {
  equipmentsCountInfo: EquipmentsCountInfo[];
  equipmentCreationInProgress: boolean;
  buildingId?: number;
  roomId?: number;
}

export interface IAddEquipmentFieldCallProps {
  loadEquipmentsCountInfo: () => void;
  createEquipment: (equipment: EquipmentsCountInfo) => void;
}

export class EquipmentsCountInfo {
  constructor(name: string, count: number) {
    this.name = name;
    this.count = count;
  }
  name: string;
  count: number;
  static readonly maxNameLength: number = 100;
}
