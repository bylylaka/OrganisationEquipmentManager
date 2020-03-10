import { connect } from "react-redux";
import { State } from "../../reducers/reducer";
import AddEquipmentField from "./AddEquipmentField";
import {
  IAddEquipmentFieldProps,
  IAddEquipmentFieldCallProps,
  EquipmentsCountInfo
} from "./props";
import Actions from "../../actions/actions";
import { AppSnackbarMessage } from "../../shared/AppSnackbar/props";
import IOrganisationNavigationProps from "../../shared/OrganisationNavigation";
import { Dispatch } from "redux";

type ContainerProps = Pick<IOrganisationNavigationProps, "roomId">;

const mapStateToProps = (
  state: State,
  ownProps: ContainerProps
): IAddEquipmentFieldProps => {
  return {
    equipmentsCountInfo: state.equipmentsCountInfo,
    roomId: ownProps.roomId
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): IAddEquipmentFieldCallProps => {
  return {
    setEquipmentsCountInfo: (info: EquipmentsCountInfo[]) =>
      dispatch(Actions.setEquipmentsCountInfo(info)),
    enqueAppSnackbar: (message: AppSnackbarMessage) => {
      dispatch(Actions.setAppSnackbarMessage(message));
    }
  };
};

const AddEquipmentFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEquipmentField) as React.ComponentType<ContainerProps>;

export default AddEquipmentFieldContainer;
