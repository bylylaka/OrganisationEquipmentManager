import { connect } from "react-redux";
import { State } from "../../reducers/reducer";
import { IAppSnackbarProps } from "./props";
import AppSnackbar from "./AppSnackbar";

const mapStateToProps = (state: State): IAppSnackbarProps => {
  return {
    message: state.AppSnackbarMessage
  };
};

const AppSnackbarContainer = connect(mapStateToProps)(
  AppSnackbar
) as React.ComponentType;

export default AppSnackbarContainer;
