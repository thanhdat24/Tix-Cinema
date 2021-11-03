import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import ScrollToTop from "react-scroll-up";

import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  top: {
    marginTop: 64,
    [theme.breakpoints.down("xs")]: {
      marginTop: 56,
    },
  },
  styleScrollToTop: {
    position: "fixed",
    bottom: 30,
    right: 10,
    transitionTimingFunction: "linear",
    width: 50,
    transform: "rotate(180deg)",
    zIndex: 5000,
  },
}));
export const HomeTemplate = (props) => {
  const classes = useStyles();

  // path, exact: Xác định đường dẫn, component
  const { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        // props.location, props.history, props.match
        return (
          <Fragment>
            <Header {...propsRoute} />
            <div className={classes.top}></div>
            <Component {...propsRoute} />
            <Footer />
            <ScrollToTop showUnder={160}>
              <img
                src="/assets/img/logoTixLoading.png"
                alt="totop"
                className={classes.styleScrollToTop}
              />
            </ScrollToTop>
          </Fragment>
        );
      }}
    />
  );
};
