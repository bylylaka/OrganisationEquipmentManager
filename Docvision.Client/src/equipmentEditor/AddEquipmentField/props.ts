export interface IAddEquipmentFieldProps {
  equipmentsCountInfo: EquipmentsCountInfo[];
}

export interface IAddEquipmentFieldCallProps {
  setEquipmentsCountInfo: (info: EquipmentsCountInfo[]) => void;
}

export class AutocompleteProps {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  count?: number;
  inputValue?: string;
}

export interface EquipmentsCountInfo {
  name: string;
  count: number;
}
