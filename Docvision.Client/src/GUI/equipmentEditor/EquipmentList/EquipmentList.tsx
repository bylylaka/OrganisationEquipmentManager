import React, { FunctionComponent, useEffect, useCallback } from "react";
import { IEquipmentListProps, IEquipmentListCallProps } from "./props";
import createStyles from "./styles";
import List from "@material-ui/core/List";
import EquipmentListItem from "./EquipmentListItem/EquipmentListItem";
import { v1 as uuid } from "uuid";

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

  const renderEquipmentList = () => {
    return equipment.map(e => (
      <EquipmentListItem
        key={uuid()}
        equipment={e}
        roomId={roomId}
        removeEquipment={removeEquipment}
        updateEquipmentCount={updateEquipmentCount}
      />
    ));
  };

  const memoizedRenderEquipmentList = useCallback(() => renderEquipmentList(), [
    equipment,
    roomId
  ]);

  return <List className={classes.root}>{memoizedRenderEquipmentList()}</List>;
};

export default EquipmentList;
