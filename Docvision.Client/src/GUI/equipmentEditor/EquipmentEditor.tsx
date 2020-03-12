import React, { FunctionComponent, useEffect } from "react";
import { IEquipmentEditorProps, IEquipmentEditorCallProps } from "./props";
import AddEquipmentFieldContainer from "./AddEquipmentField/AddEquipmentFieldContainer";
import EquipmentListContainer from "./EquipmentList/EquipmentListContainer";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import createStyles from "./styles";

const EquipmentEditor: FunctionComponent<IEquipmentEditorProps &
  IEquipmentEditorCallProps> = props => {
  const { buildingId, roomId, loadallEquipment } = props;

  const classes = createStyles();

  useEffect(() => {
    loadallEquipment();
  }, []);

  const renderHeader = () => {
    if (Boolean(roomId)) {
      return (
        <AddEquipmentFieldContainer
          buildingId={buildingId}
          roomId={roomId as number}
        />
      );
    }
    if (Boolean(buildingId)) {
      return (
        <Typography variant="h5" color="primary">
          Оборудование здания
        </Typography>
      );
    }
    return (
      <Typography variant="h5" color="primary">
        Выберите здание или комнату в боковом меню для просмотра содержимого.
      </Typography>
    );
  };

  return (
    <Grid className={classes.root}>
      <Grid className={classes.header}>{renderHeader()}</Grid>
      {Boolean(buildingId) && (
        <EquipmentListContainer buildingId={buildingId} roomId={roomId} />
      )}
    </Grid>
  );
};

export default EquipmentEditor;
