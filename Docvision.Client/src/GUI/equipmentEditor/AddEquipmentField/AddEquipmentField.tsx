import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback
} from "react";
import TextField from "@material-ui/core/TextField";
import { IAddEquipmentFieldProps, IAddEquipmentFieldCallProps } from "./props";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddEquipmentDialog from "./AddEquipmentDialog/AddEquipmentDialog";
import Typography from "@material-ui/core/Typography";
import createStyles from "./styles";
import Button from "@material-ui/core/Button";
import EquipmentSimplified from "../models/equipmentSimplified";

const AddEquipmentField: FunctionComponent<IAddEquipmentFieldProps &
  IAddEquipmentFieldCallProps> = props => {
  const {
    allEquipment,
    localEquipment,
    createEquipment,
    equipmentCreationInProgress,
    roomId
  } = props;

  const [inputValue, setInputValue] = useState("");
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState(
    new EquipmentSimplified("", 0)
  );
  const [errorMessage, setErrorMessage] = useState("");

  const classes = createStyles();

  useEffect(() => {
    setInputValue("");
    setErrorMessage("");
  }, [roomId]);

  const handleClose = () => {
    if (equipmentCreationInProgress) {
      return;
    }
    setDialogValue(new EquipmentSimplified("", 0));
    toggleOpen(false);
  };

  const submit = (event: React.ChangeEvent<{}>) => {
    event.preventDefault();
    createEquipment(dialogValue);
    setInputValue("");
    handleClose();
  };

  const handleSubmitClick = () => {
    let errorMessage = getNameErrorMessage(inputValue);
    if (Boolean(errorMessage)) {
      setErrorMessage(errorMessage);
      return;
    }
    toggleOpen(true);
    let dialogValue = new EquipmentSimplified(inputValue, 1);
    setDialogValue(dialogValue);
  };

  const getNameErrorMessage = (name: string): string => {
    if (name.length < 1 || name.length > EquipmentSimplified.maxNameLength) {
      return `Строка должна иметь длину от 1 до ${EquipmentSimplified.maxNameLength} символв включительно.`;
    }
    if (localEquipment.map(e => e.name).indexOf(name) != -1) {
      return "Оборудование уже содержится в этой комнате.";
    }
    return "";
  };

  const onInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: "input" | "reset" | "clear"
  ) => {
    setInputValue(value);
    var errorMessage = getNameErrorMessage(value);
    setErrorMessage(errorMessage);
  };

  const generateOptions = (): string[] => {
    let locaEquipmentNames = localEquipment.map(e => e.name);
    let allEquipmentNames = allEquipment.map(e => e.name);
    return allEquipmentNames.filter(e => locaEquipmentNames.indexOf(e) === -1);
  };

  const memoizedGenerateOptions = useCallback(() => generateOptions(), [
    allEquipment,
    localEquipment
  ]);

  return (
    <Grid item>
      <Typography className={classes.tite}>
        Добавить новое оборудование
      </Typography>
      <Grid item container>
        <Autocomplete
          inputValue={inputValue}
          onInputChange={onInputChange}
          options={memoizedGenerateOptions()}
          className={classes.autocompleteTextField}
          freeSolo
          renderInput={params => (
            <TextField
              {...params}
              error={Boolean(errorMessage)}
              helperText={errorMessage || " "}
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
          getNameErrorMessage={getNameErrorMessage}
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
