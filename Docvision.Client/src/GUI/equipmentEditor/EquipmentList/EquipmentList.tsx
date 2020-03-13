import React, { FunctionComponent, useEffect } from "react";
import { IEquipmentListProps, IEquipmentListCallProps } from "./props";
import createStyles from "./styles";
import List from "@material-ui/core/List";
import EquipmentListItem from "./EquipmentListItem/EquipmentListItem";

const EquipmentList: FunctionComponent<IEquipmentListProps &
  IEquipmentListCallProps> = props => {
  const {
    equipment,
    buildingId,
    roomId,
    getEquipment,
    removeEquipment,
    updateEquipmentCount
  } = props;

  const classes = createStyles();

  useEffect(() => {
    getEquipment();
  }, [buildingId, roomId]);

  //TODO: remove replace from key
  return (
    <List className={classes.root} style={{ maxHeight: 820, overflow: "auto" }}>
      {equipment.map(e => (
        <EquipmentListItem
          key={e.name.replace(" ", "")}
          equipment={e}
          roomId={roomId}
          removeEquipment={removeEquipment}
          updateEquipmentCount={updateEquipmentCount}
        />
      ))}
    </List>
  );
};

export default EquipmentList;
