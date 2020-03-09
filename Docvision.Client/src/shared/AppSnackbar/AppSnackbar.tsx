import React, { useState, useEffect } from "react";
import { FunctionComponent } from "react";
import { IAppSnackbarProps } from "./props";
import Snackbar from "@material-ui/core/Snackbar";

const AppSnackbar: FunctionComponent<IAppSnackbarProps> = props => {
  const { message } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message.message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (event: React.SyntheticEvent, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message.message}
    />
  );
};

export default AppSnackbar;
