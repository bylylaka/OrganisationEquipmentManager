export interface IAddEquipmentFieldProps {
  equipmentsCountInfo: EquipmentsCountInfo[];
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
}
