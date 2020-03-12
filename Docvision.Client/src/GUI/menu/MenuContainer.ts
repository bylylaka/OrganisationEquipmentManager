import { connect } from "react-redux";
import { State } from "../../logic/reducers/reducer";
import { IMenuProps, IMenuCallProps } from "./props";
import Menu from "./Menu";
import IOrganisationNavigationProps from "../shared/OrganisationNavigation";
import { Dispatch } from "redux";
import Actions from "../../logic/actions/actions";

type ContainerProps = IOrganisationNavigationProps;

const mapStateToProps = (
  state: State,
  ownProps: ContainerProps
): Omit<IMenuProps, keyof ContainerProps> => {
  return {
    structure: [...state.organisationStructure],
    isLoading: state.setOrganisationStructureIsLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IMenuCallProps => {
  return {
    loadOrganisationStructure: () =>
      dispatch(Actions.getOrganisationStructure())
  };
};

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu) as React.ComponentType<ContainerProps>;

export default MenuContainer;
