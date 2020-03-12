import React, { FunctionComponent } from "react";
import { IMainPageProps } from "./props";
import MenuContainer from "../menu/MenuContainer";
import Grid from "@material-ui/core/Grid";
import EquipmentEditorContainer from "../equipmentEditor/EquipmentEditorContainer";
import createStyles from "./styles";

const MainPage: FunctionComponent<IMainPageProps> = props => {
  const { buildingId, roomId } = props;

  const classes = createStyles();

  return (
    <Grid container wrap="nowrap">
      <Grid className={classes.menu}>
        <MenuContainer buildingId={buildingId} roomId={roomId} />
      </Grid>
      <Grid className={classes.main}>
        <EquipmentEditorContainer buildingId={buildingId} roomId={roomId} />
      </Grid>
    </Grid>
  );
};

export default MainPage;
