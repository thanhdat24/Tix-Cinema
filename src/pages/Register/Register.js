import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "./Register.module.css";
import logoTix from "../../image/logoTix.png";
import { Form, Formik } from "formik";
import * as yup from "yup";
import TextField from "../../pages/UsersManagement/Textfield";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import {
  registerAction,
  resetErrorLoginRegister,
} from "../../redux/actions/UserManagementAction";
import { GPID } from "../../util/settings/config";

export default function Register(props) {
  const { responseRegister, loadingRegister } = useSelector(
    (state) => state.UserManagementReducer
  );
  let location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (responseRegister) {
      // đăng ký thành công thì đăng nhập, responseRegister để bỏ qua componentditmount
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Bạn đã đăng ký thành công",
        showConfirmButton: false,
        timer: 2000,
      });
      history.push("/login", location.state);
    }
  }, [responseRegister]);

  useEffect(() => {
    return () => {
      dispatch(resetErrorLoginRegister());
    };
  }, []);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const signupUserSchema = yup.object().shape({
    taiKhoan: yup.string().required("*Tài khoản không được bỏ trống !"),
    matKhau: yup.string().required("*Mật khẩu không được bỏ trống !"),
    email: yup
      .string()
      .required("*Email không được bỏ trống !")
      .email("* Email không hợp lệ "),
    soDt: yup
      .string()
      .required("*Số điện thoại không được bỏ trống !")
      .matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
    hoTen: yup.string().required("*Tên không được bỏ trống !"),
  });

  const handleSubmit = (user) => {
    // trường hợp nào thì cho đăng ký(return true): loadingRegister=false và responseRegister=null
    console.log(`user`, user);
    if (!loadingRegister && !responseRegister) {
      dispatch(registerAction(user));
    }
  };
  const ValidationTextField = withStyles({
    root: {
      "& input": {
        color: "#fff",
      },
      "& label": {
        color: "#fff",
      },

      "& input:valid + fieldset": {
        borderColor: "green",
        borderWidth: 2,
      },
      "& input:invalid + fieldset": {
        borderColor: "#fff",
        borderWidth: 2,
      },
      "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        padding: "4px !important", // override inline-style
      },
      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: "#1976d2",
        },
      },
    },
  })(TextField);
  return (
    <div className="text-light">
      <img src={logoTix} alt="logoTix" className={`${style.logoTix}`} />
      <div className="mb-3 mt-6">
        <p className={`${style.text}`}>
          Đăng Ký để được nhiều ưu đãi, mua vé và bảo mật thông tin!
        </p>
      </div>
      <Formik
        initialValues={{
          taiKhoan: "",
          matKhau: "",
          email: "",
          soDt: "",
          maNhom: GPID,
          maLoaiNguoiDung: "KhachHang", // điền QuanTri backend cũng áp dụng KhachHang
          hoTen: "",
        }}
        validationSchema={signupUserSchema} // validationSchdema:  thu vien yup nhập sai ko submit được
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="m-2">
            <div className="form-group">
              <ValidationTextField
                autoComplete="off"
                name="taiKhoan"
                fullWidth
                required
                label="Tài khoản"
              />
            </div>
            <div className="form-group">
              <ValidationTextField
                autoComplete="off"
                fullWidth
                required
                name="hoTen"
                label="Họ tên"
              />
            </div>
            <div className="form-group">
              <ValidationTextField
                autoComplete="off"
                fullWidth
                required
                type="tel"
                name="soDt"
                label="Số điện thoại"
                id="fullWidth"
                className={`${style.textField}`}
              />
            </div>
            <div className="form-group">
              <ValidationTextField
                autoComplete="off"
                fullWidth
                required
                name="matKhau"
                type="password"
                label="Mật khẩu"
              />
            </div>
            <div className="form-group">
              <ValidationTextField
                autoComplete="off"
                fullWidth
                required
                type="email"
                name="email"
                label="Email"
              />
            </div>
            <div className="container mb-3">
              <Button
                autoComplete="off"
                fullWidth
                required
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                Đăng ký
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
