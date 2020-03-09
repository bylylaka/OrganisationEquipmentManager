import React, { FunctionComponent, useEffect, useCallback } from "react";
import Axios, { AxiosResponse } from "axios";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory } from "react-router-dom";
import { IMenuProps, IMenuCallProps } from "./props";
import CheckIcon from "@material-ui/icons/Check";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import BuildingSimplified from "./models/BuildingSimplified";

const Menu: FunctionComponent<IMenuProps & IMenuCallProps> = props => {
  const { buildingId, roomId, structure, setOrganisationStructure } = props;

  const [expanded, setExpanded] = React.useState([] as string[]);
  const [selected, setSelected] = React.useState("");
  let history = useHistory();

  useEffect(() => {
    Axios.get(`${Axios.defaults.baseURL}/organisation/structure`).then(
      (response: AxiosResponse<BuildingSimplified[]>) => {
        setOrganisationStructure(response.data);
      }
    );
    if (buildingId) {
      setExpanded([`${buildingId}`]);
      setSelected(`${buildingId}`);
    }
    if (roomId) {
      setSelected(`${buildingId}-${roomId}`);
    }
  }, []);

  const handleSelect = (event: React.ChangeEvent<{}>, nodeId: string) => {
    let newPath = nodeId.replace("-", "/");
    history.push(`/${newPath}`);
    setSelected(nodeId);
  };

  const handleToggle = (buildingId: number) => {
    let newExpandedState = [];

    if (expanded.includes(`${buildingId}`)) {
      newExpandedState = expanded.filter(e => e != `${buildingId}`);
    } else {
      newExpandedState = [...expanded, `${buildingId}`];
    }
    setExpanded(newExpandedState);
  };

  const memoizedStructureNodes = useCallback(() => generateBuildingNodes(), [
    structure,
    expanded
  ]);

  const generateLabel = (title: string, hasEquipment: boolean) => (
    <Grid container justify="space-between">
      <Typography>{title}</Typography>
      {hasEquipment ? <CheckIcon /> : ""}
    </Grid>
  );

  const generateBuildingNodes = () =>
    structure.map(building => {
      return (
        <TreeItem
          nodeId={`${building.id}`}
          key={`${building.id}`}
          label={generateLabel(
            building.name,
            building.rooms.some(r => Boolean(r.equipmentsCount))
          )}
          collapseIcon={
            <ExpandMoreIcon onClick={() => handleToggle(building.id)} />
          }
          expandIcon={
            <ChevronRightIcon onClick={() => handleToggle(building.id)} />
          }
        >
          {generateRoomsNodes(building)}
        </TreeItem>
      );
    });

  const generateRoomsNodes = (building: BuildingSimplified) =>
    building.rooms.map(room => (
      <TreeItem
        nodeId={`${building.id}-${room.id}`}
        key={`${building.id}-${room.id}`}
        label={generateLabel(room.name, Boolean(room.equipmentsCount))}
      />
    ));

  return (
    <TreeView
      expanded={expanded}
      selected={selected}
      onNodeSelect={handleSelect}
    >
      {memoizedStructureNodes()}
    </TreeView>
  );
};

export default Menu;
