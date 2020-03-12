import { connect } from "react-redux";
import { State } from "../../../logic/reducers/reducer";
import { IAppSnackbarProps } from "./props";
import AppSnackbar from "./AppSnackbar";

const mapStateToProps = (state: State): IAppSnackbarProps => {
  return {
    message: state.appSnackbarMessage
  };
};

const AppSnackbarContainer = connect(mapStateToProps)(
  AppSnackbar
) as React.ComponentType;

export default AppSnackbarContainer;
