import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Login.module.css";
import { layThongTinDangNhapAction } from "../../redux/actions/UserManagementAction";
import * as yup from "yup";
import logoTix from "../../image/logoTix.png";
import { NavLink } from "react-router-dom";
export default function Login(props) {
  const dispatch = useDispatch();
  const [typePassword, settypePassword] = useState("password");
  const { userLogin } = useSelector((state) => state.UserManagementReducer);

  // console.log("userLogin", userLogin);
  const signinUserSchema = yup.object().shape({
    taiKhoan: yup.string().required("Please input your Username!"),
    matKhau: yup.string().required("Please input your Password!"),
  });
  // const formik = useFormik({
  //   initialValues: {
  //     taiKhoan: "",
  //     matKhau: "",
  //   },
  //   onSubmit: (values) => {
  //     dispatch(layThongTinDangNhapAction(values));

  //     console.log("values", values);
  //   },
  // });

  const handleSubmit = (user) => {
    dispatch(layThongTinDangNhapAction(user));
  };
  return (
    <div className={`${style.background}`}>
      <div className={`text-light ${style.signin}`}>
        <img src={logoTix} alt="logoTix" className={`${style.logoTix}`} />
        <div className="mb-3 mt-20">
          <p className={`${style.text}`}>
            Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!
          </p>
        </div>
        <div>
          <Formik
            initialValues={{
              taiKhoan: "",
              matKhau: "",
            }}
            validationSchema={signinUserSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="form-group position-relative mb-2">
                  <Field
                    type="text"
                    className="form-control"
                    name="taiKhoan"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    name="taiKhoan"
                    render={(msg) => (
                      <small className="text-danger">{msg}</small>
                    )}
                  />
                </div>
                <div className="form-group position-relative">
                  <Field
                    type={typePassword}
                    className="form-control"
                    name="matKhau"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="matKhau"
                    render={(msg) => (
                      <small className="text-danger mb-3">{msg}</small>
                    )}
                  />
                  <div
                  // className={classes.eye}
                  // onMouseDown={handleHold}
                  // onMouseUp={handleRelease}
                  // onClick={handleShowPassword}
                  >
                    {/* {typePassword === "password" ? (
                        <i
                          className={
                            isDesktop ? "fa fa-eye-slash" : "fa fa-eye"
                          }
                        ></i>
                      ) : (
                        <i
                          className={
                            isDesktop ? "fa fa-eye" : "fa fa-eye-slash"
                          }
                        ></i>
                      )} */}
                  </div>
                </div>

                <div className="flex flex-row justify-between">
                  <div role="group" aria-labelledby="checkbox-group">
                    <label>
                      <Field type="checkbox" name="checked" value="One" />
                      <span className="ml-2">Remember me</span>
                    </label>
                  </div>
                  <a href="/">Forgot password</a>
                </div>

                <button
                  style={{
                    backgroundColor: "#3E63b6",
                    borderColor: "#3E63b6",
                    cursor: "pointer",
                  }}
                  // disable={errorLogin?.toString()}
                  type="submit"
                  className="btn btn-success mt-3 container"
                >
                  Log in
                </button>

                <p className="mt-2">
                  Or
                  <NavLink to="/register"> register now!</NavLink>
                </p>

                {/* error from api */}
                {/* {errorLogin && (
                    <div className="alert alert-danger">
                      <span> {errorLogin}</span>
                    </div>
                  )} */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
