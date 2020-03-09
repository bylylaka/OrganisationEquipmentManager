export interface IAddEquipmentFieldProps {
  equipmentsCountInfo: EquipmentsCountInfo[];
}

export interface IAddEquipmentFieldCallProps {
  setEquipmentsCountInfo: (info: EquipmentsCountInfo[]) => void;
}

export class EquipmentsCountInfo {
  constructor(name: string, count: number) {
    this.name = name;
    this.count = count;
  }
  name: string;
  count: number;
}
