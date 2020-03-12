import React, { FunctionComponent, useState, useEffect } from "react";
import createStyles from "./styles";
import TextField from "@material-ui/core/TextField";
import { IEquipmentListItemProps, IEquipmentListItemCallProps } from "./props";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import Tooltip from "@material-ui/core/Tooltip";
import EquipmentSimplified from "../../models/equipmentSimplified";

const EquipmentListItem: FunctionComponent<IEquipmentListItemProps &
  IEquipmentListItemCallProps> = props => {
  const { equipment, roomId } = props;

  const classes = createStyles();

  const [count, setCount] = useState(equipment.count);

  useEffect(() => {
    setCount(equipment.count);
  }, [equipment]);

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCount(Number(value));
  };

  return (
    <>
      <Grid
        container
        key={equipment.name}
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item className={classes.name}>
          <Typography noWrap>{equipment.name}</Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          wrap="nowrap"
          className={
            classes.control + " " + (isNaN(roomId) ? classes.hidden : "")
          }
        >
          <TextField
            required
            margin="dense"
            inputProps={{ min: "1", max: EquipmentSimplified.maxCountValue }}
            value={count}
            onChange={handleCountChange}
            label="Count"
            type="number"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={equipment.count == count}
          >
            Сохранить
          </Button>
          <Tooltip title="Удалить">
            <ClearIcon color="error" />
          </Tooltip>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default EquipmentListItem;
