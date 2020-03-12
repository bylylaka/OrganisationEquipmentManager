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
import CircularProgress from "@material-ui/core/CircularProgress";
import createStyles from "./styles";
import { EquipmentsCountInfo } from "../AddEquipmentField/props";

const AddEquipmentDialog: FunctionComponent<IAddEqiupmentDialogProps &
  IAddEquipmentDialogCallProps> = props => {
  const {
    isOpen,
    handleClose,
    handleSubmit,
    dialogValue,
    setDialogValue,
    submitting
  } = props;

  const classes = createStyles();

  const [nameFieldErrorMessage, setNameFieldErrorMessage] = useState("");

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setDialogValue({ ...dialogValue, name: value });

    if (value.length < 1 || value.length > EquipmentsCountInfo.maxNameLength) {
      setNameFieldErrorMessage(
        `Строка должна иметь длину от 1 до ${EquipmentsCountInfo.maxNameLength} символв включительно.`
      );
    } else {
      setNameFieldErrorMessage("");
    }
  };

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
            error={Boolean(nameFieldErrorMessage)}
            helperText={nameFieldErrorMessage || " "}
            margin="dense"
            value={dialogValue.name}
            onChange={onNameChange}
            className={classes.nameField}
            label="title"
            type="text"
          />
          <TextField
            required
            margin="dense"
            inputProps={{ min: "1", max: "10000" }}
            value={dialogValue.count}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDialogValue({
                ...dialogValue,
                count: Number(event.target.value)
              })
            } //TODO: VALIDATE!
            label="Count"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={submitting}>
            Отмена
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={submitting || Boolean(nameFieldErrorMessage)}
          >
            Добавить
            {submitting && (
              <CircularProgress
                size={14}
                className={classes.circularProgress}
              />
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEquipmentDialog;
