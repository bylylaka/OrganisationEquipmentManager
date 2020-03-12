import React, { FunctionComponent, useEffect } from "react";
import { IEquipmentListProps, IEquipmentListCallProps } from "./props";

const EquipmentList: FunctionComponent<IEquipmentListProps &
  IEquipmentListCallProps> = props => {
  const { getEquipment, equipment, buildingId, roomId } = props;

  useEffect(() => {
    getEquipment();
  }, [buildingId, roomId]);

  return (
    <>
      {equipment.map(e => (
        <p>{e.name}</p>
      ))}
    </>
  );
};

export default EquipmentList;
