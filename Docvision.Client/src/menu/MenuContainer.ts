import { connect } from "react-redux";
import { State } from "../reducers/reducer";
import Actions from "../actions/actions";
import BuildingSimplified from "./models/BuildingSimplified";
import { IMenuProps, IMenuCallProps } from "./props";
import Menu from "./Menu";
import IOrganisationNavigationProps from "../shared/OrganisationNavigation";
import { Dispatch } from "redux";

type ContainerProps = IOrganisationNavigationProps;

const mapStateToProps = (
  state: State,
  ownProps: ContainerProps
): IMenuProps => {
  return {
    buildingId: ownProps.buildingId,
    roomId: ownProps.roomId,
    structure: state.organisationStructure
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IMenuCallProps => {
  return {
    setOrganisationStructure: (structure: BuildingSimplified[]) =>
      dispatch(Actions.setOrganisationStructure(structure))
  };
};

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu) as React.ComponentType<ContainerProps>;

export default MenuContainer;
