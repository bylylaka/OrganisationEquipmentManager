import { connect } from "react-redux";
import { State } from "../../../logic/reducers/reducer";
import AddEquipmentField from "./AddEquipmentField";
import { IAddEquipmentFieldProps, IAddEquipmentFieldCallProps } from "./props";
import Actions from "../../../logic/actions/actions";
import { Dispatch } from "redux";
import IOrganisationNavigationProps from "../../shared/OrganisationNavigation";
import EquipmentSimplified from "../models/equipmentSimplified";

type ContainerProps = Pick<
  IOrganisationNavigationProps,
  "roomId" | "buildingId"
>;

const mapStateToProps = (state: State): IAddEquipmentFieldProps => {
  return {
    allEquipment: [...state.allEquipment],
    localEquipment: [...state.localEquipment],
    equipmentCreationInProgress: state.equipmentCreationInProgress
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: ContainerProps
): IAddEquipmentFieldCallProps => {
  return {
    createEquipment: (equipment: EquipmentSimplified) =>
      dispatch(
        Actions.createEquipment(ownProps.buildingId, ownProps.roomId, equipment)
      )
  };
};

const AddEquipmentFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEquipmentField) as React.ComponentType<ContainerProps>;

export default AddEquipmentFieldContainer;
