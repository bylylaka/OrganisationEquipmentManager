import React, { FunctionComponent, useEffect } from "react";
import { IEquipmentEditorProps, IEquipmentEditorCallProps } from "./props";
import AddEquipmentFieldContainer from "./AddEquipmentField/AddEquipmentFieldContainer";
import EquipmentListContainer from "./EquipmentList/EquipmentListContainer";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import createStyles from "./styles";

const EquipmentEditor: FunctionComponent<IEquipmentEditorProps &
  IEquipmentEditorCallProps> = props => {
  const { buildingId, roomId, loadAllEquipmentNames } = props;

  const classes = createStyles();

  useEffect(() => {
    loadAllEquipmentNames();
  }, []);

  return (
    <Grid>
      {Boolean(roomId) && (
        <AddEquipmentFieldContainer roomId={roomId as number} />
      )}
      {Boolean(buildingId) && (
        <EquipmentListContainer buildingId={buildingId} roomId={roomId} />
      )}
      {!Boolean(buildingId) && (
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Typography variant="h5" color="primary">
              Выберите здание или комнату в боковом меню для просмотра
              содержимого.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default EquipmentEditor;
