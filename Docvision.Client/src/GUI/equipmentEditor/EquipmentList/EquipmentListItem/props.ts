import EquipmentSimplified from "../../models/equipmentSimplified";

export interface IEquipmentListItemProps {
  equipment: EquipmentSimplified;
  roomId: number;
}

export interface IEquipmentListItemCallProps {
  removeEquipment: (equipment: EquipmentSimplified) => void;
  updateEquipmentCount: (equipment: EquipmentSimplified) => void;
}
