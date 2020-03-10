import { connect } from "react-redux";
import { State } from "../logic/reducers/reducer";
import BuildingSimplified from "./models/BuildingSimplified";
import { IMenuProps, IMenuCallProps } from "./props";
import Menu from "./Menu";
import IOrganisationNavigationProps from "../shared/OrganisationNavigation";
import { Dispatch } from "redux";
import Actions from "../logic/actions/actions";

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
