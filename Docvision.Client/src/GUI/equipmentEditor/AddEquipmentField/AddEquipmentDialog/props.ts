import EquipmentSimplified from "../../models/equipmentSimplified";

export interface IAddEqiupmentDialogProps {
  isOpen: boolean;
  dialogValue: EquipmentSimplified;
  submitting: boolean;
}

export interface IAddEquipmentDialogCallProps {
  handleClose: () => void;
  handleSubmit: (event: React.ChangeEvent<{}>) => void;
  setDialogValue: (dialogValue: EquipmentSimplified) => void;
  getNameErrorMessage: (name: string) => string;
}
