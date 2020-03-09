import { connect } from "react-redux";
import { State } from "../reducers/reducer";
import Actions from "../actions/actions";
import BuildingSimplified from "./models/BuildingSimplified";
import { IMenuProps, IMenuCallProps } from "./props";
import Menu from "./Menu";
import OrganisationNavigation from "../shared/OrganisationNavigation";

type ContainerProps = OrganisationNavigation;

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

const mapDispatchToProps = (dispatch: any): IMenuCallProps => {
  return {
    setOrganisationStructure: (structure: BuildingSimplified[]) =>
      dispatch(Actions.setOrganisationStructure(structure))
  };
};

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;
