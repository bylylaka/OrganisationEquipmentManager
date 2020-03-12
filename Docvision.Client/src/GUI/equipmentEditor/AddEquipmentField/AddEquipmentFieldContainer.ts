import { connect } from "react-redux";
import { State } from "../../../logic/reducers/reducer";
import AddEquipmentField from "./AddEquipmentField";
import {
  IAddEquipmentFieldProps,
  IAddEquipmentFieldCallProps,
  EquipmentsCountInfo
} from "./props";
import Actions from "../../../logic/actions/actions";
import { Dispatch } from "redux";
import IOrganisationNavigationProps from "../../shared/OrganisationNavigation";

type ContainerProps = Pick<IOrganisationNavigationProps, "roomId">;

const mapStateToProps = (state: State): IAddEquipmentFieldProps => {
  return {
    equipmentsCountInfo: state.equipmentsCountInfo,
    equipmentCreationInProgress: state.equipmentCreationInProgress
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: ContainerProps
): IAddEquipmentFieldCallProps => {
  return {
    loadEquipmentsCountInfo: () => dispatch(Actions.getEquipmentCountInfo()),
    createEquipment: (equipment: EquipmentsCountInfo) =>
      dispatch(Actions.createEquipment(ownProps.roomId, equipment))
  };
};

const AddEquipmentFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEquipmentField) as React.ComponentType<ContainerProps>;

export default AddEquipmentFieldContainer;
