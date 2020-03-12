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
    removeEquipment
  } = props;

  const classes = createStyles();

  useEffect(() => {
    getEquipment();
  }, [buildingId, roomId]);

  return (
    <List className={classes.root}>
      {equipment.map(e => (
        <EquipmentListItem
          equipment={e}
          roomId={roomId}
          removeEquipment={removeEquipment}
        />
      ))}
    </List>
  );
};

export default EquipmentList;
