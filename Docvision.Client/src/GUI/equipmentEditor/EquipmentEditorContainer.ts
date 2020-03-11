import { connect } from "react-redux";
import { State } from "../../logic/reducers/reducer";
import { IEquipmentEditorProps, IEquipmentEditorCallProps } from "./props";
import EquipmentEditor from "./EquipmentEditor";
import IOrganisationNavigationProps from "../shared/OrganisationNavigation";
import { Dispatch } from "redux";

type ContainerProps = IOrganisationNavigationProps;

const mapStateToProps = (
  state: State,
  ownProps: ContainerProps
): Omit<IEquipmentEditorProps, keyof ContainerProps> => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): IEquipmentEditorCallProps => {
  return {};
};

const EquipmentEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentEditor) as React.ComponentType<ContainerProps>;

export default EquipmentEditorContainer;
