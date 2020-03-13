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
import IconButton from "@material-ui/core/IconButton";
import EquipmentSimplified from "../../models/equipmentSimplified";

const EquipmentListItem: FunctionComponent<IEquipmentListItemProps &
  IEquipmentListItemCallProps> = props => {
  const { equipment, roomId, removeEquipment, updateEquipmentCount } = props;

  const classes = createStyles();

  const [count, setCount] = useState(equipment.count);

  useEffect(() => {
    setCount(equipment.count);
  }, [equipment]);

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCount(Number(value));
  };

  const handleRemove = () => {
    removeEquipment(equipment);
  };

  const handeSubmit = (event: React.ChangeEvent<{}>) => {
    event.preventDefault();
    let newEquipment = equipment;
    newEquipment.count = count;
    updateEquipmentCount(equipment);
  };

  //disable X button when deleting in progress
  return (
    <form onSubmit={handeSubmit}>
      <Grid container justify="space-between" alignItems="center" wrap="nowrap">
        <Grid item className={classes.name}>
          <Typography noWrap>{equipment.name}</Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          wrap="nowrap"
          className={classes.control}
        >
          <TextField
            required
            disabled={isNaN(roomId)}
            margin="dense"
            inputProps={{ min: "1", max: EquipmentSimplified.maxCountValue }}
            value={count}
            onChange={handleCountChange}
            label="Count"
            type="number"
          />
          <span className={isNaN(roomId) ? classes.hidden : ""}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={equipment.count === count}
              type="submit"
            >
              Сохранить
            </Button>
            <Tooltip title="Удалить">
              <IconButton size="small">
                <ClearIcon color="error" onClick={handleRemove} />
              </IconButton>
            </Tooltip>
          </span>
        </Grid>
      </Grid>
      <Divider />
    </form>
  );
};

export default EquipmentListItem;
