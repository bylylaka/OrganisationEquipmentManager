import React, { useState, useEffect } from "react";
import { FunctionComponent } from "react";
import { IAppSnackbarProps } from "./props";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <MuiAlert variant="filled" severity={message.type}>
        {message.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AppSnackbar;
