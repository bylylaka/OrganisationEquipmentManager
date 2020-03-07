import { connect } from "react-redux";
import Menu from "./Menu";
import IMenuProps, { IMenuCallProps } from "./props";
import { RouteComponentProps } from "react-router-dom";
import { State } from "../reducers/reducer";
import Actions from "../actions/actions";
import buildingSimplified from "./models/buildingSimplified";

interface MatchProps {
  buildingId: string;
  roomId: string;
}

type ContainerProps = RouteComponentProps<MatchProps>;

const mapStateToProps = (
  state: State,
  ownProps: ContainerProps
): IMenuProps => {
  return {
    buildingId: Number(ownProps.match.params.buildingId),
    roomId: Number(ownProps.match.params.roomId),
    structure: state.organisationStructure
  };
};

const mapDispatchToProps = (dispatch: any): IMenuCallProps => {
  return {
    setOrganisationStructure: (structure: buildingSimplified[]) =>
      dispatch(Actions.setOrganisationStructure(structure))
  };
};

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;
