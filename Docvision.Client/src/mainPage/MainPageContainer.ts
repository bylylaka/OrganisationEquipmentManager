import { connect } from "react-redux";
import MainPage from "./MainPage";
import { RouteComponentProps } from "react-router-dom";
import { State } from "../logic/reducers/reducer";
import { IMainPageProps } from "./props";

interface MatchProps {
  buildingId: string;
  roomId: string;
}

type ContainerProps = RouteComponentProps<MatchProps>;

const mapStateToProps = (
  state: State,
  ownProps: ContainerProps
): IMainPageProps => {
  return {
    buildingId: Number(ownProps.match.params.buildingId),
    roomId: Number(ownProps.match.params.roomId)
  };
};

const MainPageContainer = connect(
  mapStateToProps,
  null
)(MainPage) as React.ComponentType<ContainerProps>;

export default MainPageContainer;
