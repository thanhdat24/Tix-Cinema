import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  layThongTinNguoiDungAction,
  updateUser,
} from "../../redux/actions/UserManagementAction";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";
import NavigationIcon from "@material-ui/icons/Navigation";
import { useStyles, ValidationTextField } from "./styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

function TabPanel(props) {
  const { children, value, index, isDesktop, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box style={{ padding: isDesktop ? "24px" : "24px 0px 0px" }}>
          {children}
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function Profile() {
  const history = useHistory();
  const classes = useStyles();

  const { thongTinNguoiDung, loadingUpdateUser, successUpdateUser, userLogin } =
    useSelector((state) => state.UserManagementReducer);
  console.log("userLogin", userLogin);
  const [value, setValue] = React.useState(0);
  const [typePassword, settypePassword] = useState("password");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
  }, []);
  console.log("ThongTinNguoiDung", thongTinNguoiDung);

  // lấy id ghế để render ra nhiều ghê
  const getIdSeat = (danhSachGhe) => {
    return danhSachGhe
      .reduce((listSeat, seat) => {
        return [...listSeat, seat.tenGhe];
      }, [])
      .join(", ");
  };

  useEffect(() => {
    if (successUpdateUser) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cập nhật thành công",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [successUpdateUser]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const updateUserSchema = yup.object().shape({
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
    if (loadingUpdateUser) {
      return;
    }
    dispatch(updateUser(user));
  };
  const handleToggleHidePassword = () => {
    if (typePassword === "password") {
      settypePassword("text");
    } else {
      settypePassword("password");
    }
  };
  return (
    <div className="bootstrap snippet mb-4">
      <br />
      <div className="row">
        <div className="col-sm-3">
          <div className="text-center">
            <img
              src={`https://i.pravatar.cc/300?u=${thongTinNguoiDung.taiKhoan}`}
              className={`avatar rounded-circle img-thumbnail w-100`}
              alt="avatar"
            />
            <h1 className="my-2 text-3xl">{thongTinNguoiDung?.taiKhoan}</h1>
          </div>
          {userLogin.maLoaiNguoiDung === "QuanTri" && (
            <div className="text-center mb-2">
              <Fab
                variant="extended"
                color="primary"
                onClick={() => history.push("/admin/users")}
              >
                <NavigationIcon className={classes.extendedIcon} />
                Tới trang quản trị
              </Fab>
            </div>
          )}
          <ul className="list-group">
            <li className="list-group-item text-muted">Hoạt động</li>
            <li className="list-group-item text-right">
              <span className="float-left">
                <strong>Bình luận</strong>
              </span>
            </li>
            <li className="list-group-item text-right">
              <span className="float-left">
                <strong>Bình luận được thích</strong>
              </span>
            </li>
            <li className="list-group-item text-right">
              <span className="float-left">
                <strong>Số lần thanh toán</strong>
              </span>
            </li>
            <li className="list-group-item text-right">
              <span className="float-left">
                <strong>Tổng tiền $</strong>
              </span>
            </li>
          </ul>
        </div>
        <div className={`col-sm-9 py-3 px-0`}>
          <AppBar className={classes.appBar} position="static">
            <Tabs value={value} onChange={handleChange}>
              <Tab
                disableRipple
                classes={{
                  root: classes.tabButton,
                  selected: classes.tabSelected,
                }}
                label="Thông tin tài khoản"
              />
              <Tab
                disableRipple
                classes={{
                  root: classes.tabButton,
                  selected: classes.tabSelected,
                }}
                label="Lịch sử đặt vé"
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Formik
              initialValues={{
                taiKhoan: thongTinNguoiDung?.taiKhoan ?? "",
                matKhau: thongTinNguoiDung?.matKhau ?? "",
                email: thongTinNguoiDung?.email ?? "",
                soDt: thongTinNguoiDung?.soDT ?? "",
                maNhom: "GP02",
                maLoaiNguoiDung: "KhachHang",
                hoTen: thongTinNguoiDung?.hoTen ?? "",
              }}
              enableReinitialize // cho phép cập nhật giá trị initialValues
              validationSchema={updateUserSchema}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form className="m-2">
                  <div className="form-group">
                    <ValidationTextField
                      name="taiKhoan"
                      label="Tài khoản"
                      // Không cho người dùng chỉnh sửa trường tài khoản
                      disabled
                    />
                  </div>
                  <div className={`form-group ${classes.password}`}>
                    <ValidationTextField
                      name="matKhau"
                      type={typePassword}
                      label="Mật khẩu"
                      autoComplete="on"
                      onChange={props.handleChange}
                      className={classes.password}
                    />
                    <div
                      className={classes.eye}
                      onClick={handleToggleHidePassword}
                    >
                      {typePassword !== "password" ? (
                        <i className="fa fa-eye-slash"></i>
                      ) : (
                        <i className="fa fa-eye"></i>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <ValidationTextField name="hoTen" label="Họ tên" />
                  </div>
                  <div className="form-group">
                    <ValidationTextField
                      type="email"
                      name="email"
                      label="Email"
                    />
                  </div>
                  <div className="form-group">
                    <ValidationTextField
                      type="tel"
                      name="soDt"
                      label="Số điện thoại"
                    />
                  </div>
                  <div className="text-left">
                    <button
                      type="submit"
                      className="btn btn-success"
                      // disable={loadingUpdateUser.toString()}
                    >
                      Cập nhật
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </TabPanel>
          <TabPanel value={value} index={1} style={{ padding: "0px 16px" }}>
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr className="whitespace-nowrap">
                    <th scope="col">Stt</th>
                    <th scope="col">Tên phim</th>
                    <th scope="col">Thời lượng phim</th>
                    <th scope="col">Ngày đặt</th>
                    <th scope="col">Tên Rạp</th>
                    <th scope="col">Mã vé</th>
                    <th scope="col">Tên ghế</th>
                    <th scope="col">Giá vé(vnđ)</th>
                    <th scope="col">Tổng tiền(vnđ)</th>
                  </tr>
                </thead>
                <tbody>
                  {thongTinNguoiDung.thongTinDatVe
                    ?.map((user, index) => (
                      <tr key={user.maVe} className="whitespace-nowrap">
                        <th scope="row">{index + 1}</th>
                        <td>{user.tenPhim}</td>
                        <td>{user.thoiLuongPhim}</td>
                        <td>
                          {new Date(user.ngayDat).toLocaleDateString()},{" "}
                          {new Date(user.ngayDat).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td>
                          {user.danhSachGhe[0].tenHeThongRap},{" "}
                          {user.danhSachGhe[0].tenRap}
                        </td>
                        <td>{user.maVe}</td>
                        <td>{getIdSeat(user.danhSachGhe)}</td>
                        <td>
                          {new Intl.NumberFormat("it-IT", {
                            style: "decimal",
                          }).format(user.giaVe)}
                        </td>
                        <td>
                          {new Intl.NumberFormat("it-IT", {
                            style: "decimal",
                          }).format(user.giaVe * user.danhSachGhe.length)}
                        </td>
                      </tr>
                    ))
                    .reverse()}
                </tbody>
              </table>
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
