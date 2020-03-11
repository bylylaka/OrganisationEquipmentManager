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
import Axios, { AxiosResponse } from "axios";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import { FilterOptionsState } from "@material-ui/lab/useAutocomplete";
import AddEquipmentDialog from "../AddEquipmentDialog/AddEquipmentDialog";
import Typography from "@material-ui/core/Typography";
import { AppSnackbarMessage } from "../../shared/AppSnackbar/props";

const AddEquipmentField: FunctionComponent<IAddEquipmentFieldProps &
  IAddEquipmentFieldCallProps> = props => {
  const {
    equipmentsCountInfo,
    setEquipmentsCountInfo,
    roomId,
    enqueAppSnackbar
  } = props;

  const [inputValue, setInputValue] = useState("");
  const [open, toggleOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dialogValue, setDialogValue] = useState(
    new EquipmentsCountInfo("", 0)
  );
  const filter = createFilterOptions<string>();

  useEffect(() => {
    Axios.get(`${Axios.defaults.baseURL}/organisation/equipmentsCountInfo`)
      .then((response: AxiosResponse<EquipmentsCountInfo[]>) => {
        setEquipmentsCountInfo(response.data);
      })
      .catch(error => {
        //TODO: handle error everywhere, AppSnackbar, uuid4
      });
  }, []);

  const handleClose = () => {
    setDialogValue(new EquipmentsCountInfo("", 0));
    toggleOpen(false);
  };

  const handleSubmit = (event: React.ChangeEvent<{}>) => {
    event.preventDefault();
    setSubmitting(true);

    Axios.post(
      `${Axios.defaults.baseURL}/organisation/AddEquipment/${roomId}`,
      dialogValue
    ).then((response: AxiosResponse<EquipmentsCountInfo[]>) => {
      var updatedEquipmentsCountInfo = [...equipmentsCountInfo];
      updatedEquipmentsCountInfo.push(dialogValue);
      setEquipmentsCountInfo(updatedEquipmentsCountInfo);
    });

    setSubmitting(false);
    setInputValue("");
    handleClose();
  };

  const onChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
    if (newValue == null) {
      return;
    }
    setTimeout(() => {
      // timeout to avoid instant validation of the dialog's form.
      toggleOpen(true);
      let dialogValue = new EquipmentsCountInfo(newValue, 1);
      setDialogValue(dialogValue);
    });
    return;
  };

  const onInputChange = (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: "input" | "reset" | "clear"
  ) => {
    setInputValue(value);
  };

  const filterOptions = (options: string[], params: FilterOptionsState) => {
    const filtered = filter(options, params);
    if (
      params.inputValue &&
      memoizedGenerateOptions().indexOf(params.inputValue) === -1
    ) {
      filtered.push(params.inputValue);
    }
    return filtered;
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
      <Typography>Добавить новое оборудование</Typography>
      <Autocomplete
        inputValue={inputValue}
        onInputChange={onInputChange}
        onChange={onChange}
        filterOptions={filterOptions}
        options={memoizedGenerateOptions()}
        getOptionLabel={getOptionLabel}
        renderOption={option => `Добавить "${option}"`}
        style={{ width: 300 }} //TODO: CHANGE
        freeSolo
        renderInput={params => (
          <TextField
            {...params}
            placeholder="Введите название оборудования"
            label="Наименование оборудования"
            variant="outlined"
          />
        )}
      />
      <AddEquipmentDialog
        submitting={submitting}
        handleClose={handleClose}
        dialogValue={dialogValue}
        setDialogValue={setDialogValue}
        handleSubmit={handleSubmit}
        isOpen={open}
      />
    </Grid>
  );
};

export default AddEquipmentField;
