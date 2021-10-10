import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    control: {
      margin: "11px 0",
    },
    addMovie: { width: "100%" },
    itemCtro: {
      paddingRight: 16,
      paddingLeft: 16,
      [theme.breakpoints.up("md")]: {
        paddingRight: 32,
        paddingLeft: 32,
      },
    },
    search: {
      verticalAlign: "bottom",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.info.light, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.info.light, 0.25),
      },
      [theme.breakpoints.down("md")]: {
        marginTop: 11,
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      textOverflow: "ellipsis",
      overflow: "hidden",
      display: "flex",
    },
    inputInput: {
      padding: "8.5px 8.5px 8.5px 0px",
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  };
});
export { useStyles };
