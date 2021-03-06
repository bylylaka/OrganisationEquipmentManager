import EquipmentSimplified from "../models/equipmentSimplified";

export interface IAddEquipmentFieldProps {
  allEquipment: EquipmentSimplified[];
  localEquipment: EquipmentSimplified[];
  equipmentCreationInProgress: boolean;
  buildingId?: number;
  roomId?: number;
}

export interface IAddEquipmentFieldCallProps {
  createEquipment: (equipment: EquipmentSimplified) => void;
}
