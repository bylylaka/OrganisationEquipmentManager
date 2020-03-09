export interface IAddEqiupmentDialogProps {
  isOpen: boolean;
}

export interface IAddEquipmentDialogCallProps {
  handleClose: () => void;
  handleSubmit: (event: React.ChangeEvent<{}>) => void;
}
