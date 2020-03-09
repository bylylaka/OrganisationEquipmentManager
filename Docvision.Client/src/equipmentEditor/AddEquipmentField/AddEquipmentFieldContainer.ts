import { connect } from "react-redux";
import { State } from "../../reducers/reducer";
import AddEquipmentField from "./AddEquipmentField";
import {
  IAddEquipmentFieldProps,
  IAddEquipmentFieldCallProps,
  EquipmentsCountInfo
} from "./props";
import Actions from "../../actions/actions";

type ContainerProps = {
  roomId: number;
};

const mapStateToProps = (
  state: State,
  ownProps: ContainerProps
): IAddEquipmentFieldProps => {
  return {
    equipmentsCountInfo: state.equipmentsCountInfo,
    roomId: ownProps.roomId
  };
};

const mapDispatchToProps = (dispatch: any): IAddEquipmentFieldCallProps => {
  //TODO: add type todispatch
  return {
    setEquipmentsCountInfo: (info: EquipmentsCountInfo[]) =>
      dispatch(Actions.setEquipmentsCountInfo(info))
  };
};

const AddEquipmentFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEquipmentField);

export default AddEquipmentFieldContainer;
