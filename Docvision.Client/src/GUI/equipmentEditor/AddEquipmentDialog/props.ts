import { EquipmentsCountInfo } from "../AddEquipmentField/props";

export interface IAddEqiupmentDialogProps {
  isOpen: boolean;
  dialogValue: EquipmentsCountInfo;
  submitting: boolean;
}

export interface IAddEquipmentDialogCallProps {
  handleClose: () => void;
  handleSubmit: (event: React.ChangeEvent<{}>) => void;
  setDialogValue: (dialogValue: EquipmentsCountInfo) => void;
}
