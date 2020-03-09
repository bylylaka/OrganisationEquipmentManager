import { connect } from "react-redux";
import { State } from "../../reducers/reducer";
import { IAppSnackbarProps } from "./props";
import AppSnackbar from "./AppSnackbar";

const mapStateToProps = (state: State, ownProps: {}): IAppSnackbarProps => {
  return {
    message: state.AppSnackbarMessage
  };
};

const AppSnackbarContainer = connect(mapStateToProps, null)(AppSnackbar);

export default AppSnackbarContainer as any; //TODO: remove any and add types to all containers
