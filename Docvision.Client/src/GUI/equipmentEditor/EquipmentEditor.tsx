import React, { FunctionComponent } from "react";
import { IEquipmentEditorProps } from "./props";
import AddEquipmentFieldContainer from "./AddEquipmentField/AddEquipmentFieldContainer";

const EquipmentEditor: FunctionComponent<IEquipmentEditorProps> = props => {
  const { buildingId, roomId } = props;

  return (
    <>
      {Boolean(roomId) && (
        <AddEquipmentFieldContainer roomId={roomId as number} />
      )}
    </>
  );
};

export default EquipmentEditor;
