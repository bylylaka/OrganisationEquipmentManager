import React, { FunctionComponent, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {
  IAddEquipmentFieldProps,
  IAddEquipmentFieldCallProps,
  AutocompleteProps,
  EquipmentsCountInfo
} from "./props";
import Grid from "@material-ui/core/Grid";
import Axios, { AxiosResponse } from "axios";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import { FilterOptionsState } from "@material-ui/lab/useAutocomplete";
import AddEquipmentDialog from "../AddEquipmentDialog/AddEquipmentDialog";

const AddEquipmentField: FunctionComponent<IAddEquipmentFieldProps &
  IAddEquipmentFieldCallProps> = props => {
  const { equipmentsCountInfo, setEquipmentsCountInfo } = props;

  const [value, setValue] = useState(new AutocompleteProps(""));
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState(new AutocompleteProps(""));
  const filter = createFilterOptions<AutocompleteProps>();

  useEffect(() => {
    Axios.get(
      `${Axios.defaults.baseURL}/organisation/equipmentsCountInfo`
    ).then((response: AxiosResponse<EquipmentsCountInfo[]>) => {
      setEquipmentsCountInfo(response.data);
    });
  }, []);

  const handleClose = () => {
    setDialogValue(new AutocompleteProps(""));
    toggleOpen(false);
  };

  const handleSubmit = (event: React.ChangeEvent<{}>) => {
    event.preventDefault();
    let value = new AutocompleteProps(dialogValue.name);
    value.count = dialogValue.count;
    setValue(value);
    handleClose();
  };

  const onChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    console.log(newValue);

    if (typeof newValue === "string") {
      toggleOpen(true);
      let dialogValue = new AutocompleteProps(newValue);
      dialogValue.count = 1;
      setDialogValue(dialogValue);
      return;
    }

    if (newValue && newValue.inputValue) {
      toggleOpen(true);
      let dialogValue = new AutocompleteProps(newValue.inputValue);
      dialogValue.count = 1;
      setDialogValue(dialogValue);
      return;
    }
    setValue(newValue);
  };

  const filterOptions = (
    options: AutocompleteProps[],
    params: FilterOptionsState
  ) => {
    const filtered = filter(options, params);
    if (params.inputValue !== "") {
      filtered.push({
        inputValue: params.inputValue,
        name: params.inputValue
      } as AutocompleteProps);
    }
    return filtered;
  };

  const getOptionLabel = (option: AutocompleteProps) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.name;
  };

  return (
    <>
      <Autocomplete
        value={value}
        onChange={onChange}
        filterOptions={filterOptions}
        options={equipmentsCountInfo}
        getOptionLabel={getOptionLabel}
        renderOption={option => `Добавить "${option.name}"`}
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
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isOpen={open}
      />
    </>
  );
};

export default AddEquipmentField;
