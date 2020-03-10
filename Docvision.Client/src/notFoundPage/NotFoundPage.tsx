import React from "react";
import { FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";

const NotFountPage: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.fullscreenHeight}
    >
      <Grid item>
        <Typography variant="h5" color="primary">
          Извините, данная страница не существует.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFountPage;
