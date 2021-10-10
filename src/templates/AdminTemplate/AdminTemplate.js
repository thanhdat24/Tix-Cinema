import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router";
import { USER_LOGIN } from "../../util/settings/config";

const AdminTemplate = (props) => {
  const { userLogin } = useSelector((state) => state.UserManagementReducer);

  // path, exact: Xác định đường dẫn, component
  const { Component, ...restProps } = props;
  const { component: ComponentAdmin, ...rest } = props;
  let location = useLocation();

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        if (userLogin) {
          if (userLogin.maLoaiNguoiDung === "QuanTri") {
            return <ComponentAdmin {...propsRoute} />;
          }
          // return <AlertCanNotAccess />;
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: location.pathname,
            }}
          />
        );
      }}
    />
  );
};

export default AdminTemplate;
