import React, { FunctionComponent, useEffect, useCallback } from "react";
import IMenuProps, { IMenuCallProps } from "./props";
import Axios, { AxiosResponse } from "axios";
import buildingSimplified from "./models/buildingSimplified";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Menu: FunctionComponent<IMenuProps & IMenuCallProps> = props => {
  const { buildingId, roomId, structure, setOrganisationStructure } = props;

  const [expanded, setExpanded] = React.useState([] as string[]);
  const [selected, setSelected] = React.useState("");
  const styles = useStyles();

  useEffect(() => {
    Axios.get(`${Axios.defaults.baseURL}/organisation/structure`).then(
      (response: AxiosResponse<buildingSimplified[]>) => {
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

  const generateBuildingNodes = () =>
    structure.map(building => {
      return (
        <TreeItem
          nodeId={`${building.id}`}
          key={`${building.id}`}
          label={
            <Link to={`/${building.id}`} className={styles.link}>
              {building.name}
            </Link>
          }
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

  const generateRoomsNodes = (building: buildingSimplified) =>
    building.rooms.map(room => (
      <TreeItem
        nodeId={`${building.id}-${room.id}`}
        key={`${building.id}-${room.id}`}
        label={
          <Link to={`/${building.id}/${room.id}`} className={styles.link}>
            {room.name}
          </Link>
        }
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
