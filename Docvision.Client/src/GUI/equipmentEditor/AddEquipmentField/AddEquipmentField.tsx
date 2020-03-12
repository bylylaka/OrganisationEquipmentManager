import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback
} from "react";
import TextField from "@material-ui/core/TextField";
import {
  IAddEquipmentFieldProps,
  IAddEquipmentFieldCallProps,
  EquipmentsCountInfo
} from "./props";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddEquipmentDialog from "../AddEquipmentDialog/AddEquipmentDialog";
import Typography from "@material-ui/core/Typography";
import createStyles from "./styles";
import Button from "@material-ui/core/Button";

const AddEquipmentField: FunctionComponent<IAddEquipmentFieldProps &
  IAddEquipmentFieldCallProps> = props => {
  const {
    equipmentsCountInfo,
    loadEquipmentsCountInfo,
    createEquipment,
    equipmentCreationInProgress
  } = props;

  const [inputValue, setInputValue] = useState("");
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState(
    new EquipmentsCountInfo("", 0)
  );
  const [errorMessage, setErrorMessage] = useState("");

  const classes = createStyles();

  useEffect(() => {
    loadEquipmentsCountInfo();
  }, []);

  const handleClose = () => {
    if (equipmentCreationInProgress) {
      return;
    }
    setDialogValue(new EquipmentsCountInfo("", 0));
    toggleOpen(false);
  };

  const submit = (event: React.ChangeEvent<{}>) => {
    event.preventDefault();
    createEquipment(dialogValue);
    setInputValue("");
    handleClose();
  };

  const handleSubmitClick = () => {
    toggleOpen(true);
    let dialogValue = new EquipmentsCountInfo(inputValue, 1);
    setDialogValue(dialogValue);
    return;
  };

  const onInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: "input" | "reset" | "clear"
  ) => {
    setInputValue(value);
    if (value.length < 1 || value.length > EquipmentsCountInfo.maxNameLength) {
      setErrorMessage(
        `Строка должна иметь длину от 1 до ${EquipmentsCountInfo.maxNameLength} символв включительно.`
      );
    } else {
      setErrorMessage("");
    }
  };

  const getOptionLabel = (option: string) => {
    return option;
  };

  const generateOptions = (): string[] =>
    //TODO: remove current page equipment
    equipmentsCountInfo.filter(info => info.count > 0).map(info => info.name);

  const memoizedGenerateOptions = useCallback(() => generateOptions(), [
    equipmentsCountInfo
  ]);

  return (
    <Grid item>
      <Typography className={classes.tite}>
        Добавить новое оборудование
      </Typography>
      <Grid item container alignItems="center">
        <Autocomplete
          onInputChange={onInputChange}
          options={memoizedGenerateOptions()}
          getOptionLabel={getOptionLabel}
          className={classes.autocompleteTextField}
          freeSolo
          renderInput={params => (
            <TextField
              {...params}
              error={Boolean(errorMessage)}
              helperText={errorMessage}
              placeholder="Введите название оборудования"
              label="Наименование оборудования"
              variant="outlined"
            />
          )}
        />
        <AddEquipmentDialog
          submitting={equipmentCreationInProgress}
          handleClose={handleClose}
          dialogValue={dialogValue}
          setDialogValue={setDialogValue}
          handleSubmit={submit}
          isOpen={open}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmitClick}
        >
          Добавить
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddEquipmentField;
