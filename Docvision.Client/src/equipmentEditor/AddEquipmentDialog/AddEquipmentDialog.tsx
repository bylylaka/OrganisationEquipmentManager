import React, { FunctionComponent, useState } from "react";
import {
  IAddEqiupmentDialogProps,
  IAddEquipmentDialogCallProps
} from "./props";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { AutocompleteProps } from "../AddEquipmentField/props";

const AddEquipmentDialog: FunctionComponent<IAddEqiupmentDialogProps &
  IAddEquipmentDialogCallProps> = props => {
  const { isOpen, handleClose, handleSubmit } = props;

  const [dialogValue, setDialogValue] = useState(new AutocompleteProps(""));

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">
          Добавить новое оборудование
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={dialogValue.name}
            onChange={event =>
              setDialogValue({ ...dialogValue, name: event.target.value })
            }
            label="title"
            type="text"
          />
          <TextField
            margin="dense"
            id="name"
            value={dialogValue.count}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDialogValue({
                ...dialogValue,
                count: Number(event.target.value)
              })
            }
            label="Count"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button type="submit" color="primary">
            Добавить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEquipmentDialog;
