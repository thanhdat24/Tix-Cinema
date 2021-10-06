import { Fragment } from "react";
import { Route } from "react-router";
import style from "./UserTemplate.module.css";
export const UserTemplate = (props) => {
  //path, exact, Component

  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        //props.location,props.history,props.match

        return (
          <Fragment>
            <div className="flex">
              <div className={`${style["background"]}`}></div>
              <Component {...propsRoute} />
            </div>
          </Fragment>
        );
      }}
    />
  );
};
