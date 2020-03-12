import { connect } from "react-redux";
import { State } from "../../../logic/reducers/reducer";
import { IEquipmentListProps, IEquipmentListCallProps } from "./props";
import EquipmentList from "./EquipmentList";
import { Dispatch } from "redux";
import Actions from "../../../logic/actions/actions";

type ContainerProps = Pick<IEquipmentListProps, "buildingId" | "roomId">;

const mapStateToProps = (
  state: State,
  ownProps: ContainerProps
): Omit<IEquipmentListProps, keyof ContainerProps> => {
  return {
    equipment: state.localEquipment
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: ContainerProps
): IEquipmentListCallProps => {
  return {
    getEquipment: () =>
      dispatch(Actions.getLocalEquipment(ownProps.buildingId, ownProps.roomId))
  };
};

const EquipmentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentList) as React.ComponentType<ContainerProps>;

export default EquipmentListContainer;
