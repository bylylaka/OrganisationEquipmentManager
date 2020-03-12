import { makeStyles } from "@material-ui/core/styles";

const createStyles = makeStyles({
  control: {
    width: "fit-content",
    flexShrink: 0
  },
  button: {
    marginLeft: 20,
    marginRight: 10
  },
  name: {
    maxWidth: 385
  },
  hidden: {
    visibility: "hidden"
  }
});

export default createStyles;
