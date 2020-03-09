import React, { FunctionComponent } from "react";
import { IMainPageProps } from "./props";
import MenuContainer from "../menu/MenuContainer";
import Grid from "@material-ui/core/Grid";
import EquipmentEditorContainer from "../equipmentEditor/EquipmentEditorContainer";

const MainPage: FunctionComponent<IMainPageProps> = props => {
  const { buildingId, roomId } = props;

  return (
    <Grid container>
      <MenuContainer buildingId={buildingId} roomId={roomId} />
      <EquipmentEditorContainer buildingId={buildingId} roomId={roomId} />
    </Grid>
  );
};

export default MainPage;
