import React, { useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import "date-fns";

import TextField from "./Textfield";
import Button from "@material-ui/core/Button";
import Select from "./Select";
import { GPID } from "../../util/settings/config";
export default function FormInput({ selectedUser, onUpdate, onAddUser }) {
  const typeUser = {
    KhachHang: "Khách Hàng",
    QuanTri: "Quản Trị",
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const userSchema = yup.object().shape({
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
    maLoaiNguoiDung: yup
      .string()
      .required("*Loại người dùng không được bỏ trống !"),
  });

  const handleSubmit = (userObj) => {
    if (selectedUser.taiKhoan) {
      onUpdate(userObj);
      return;
    }
    onAddUser(userObj);
  };
  return (
    <Formik
      initialValues={{
        taiKhoan: selectedUser.taiKhoan,
        matKhau: selectedUser.matKhau,
        email: selectedUser.email,
        soDt: selectedUser.soDt,
        hoTen: selectedUser.hoTen,
        maNhom: GPID,
        maLoaiNguoiDung: selectedUser.maLoaiNguoiDung,
      }}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="m-2">
          <div className="form-group">
            <TextField
              name="taiKhoan"
              fullWidth
              label="Tài khoản"
              // Không cho người dùng chỉnh sửa trường tài khoản
              disabled={selectedUser.taiKhoan}
            />
          </div>
          <div className="form-group">
            <TextField fullWidth name="hoTen" label="Họ tên" />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              type="tel"
              name="soDt"
              label="Số điện thoại"
              id="fullWidth"
            />
          </div>
          <div className="form-group">
            <TextField
              fullWidth
              name="matKhau"
              type="password"
              label="Mật khẩu"
              autoComplete="on"
            />
          </div>
          <div className="form-group">
            <TextField fullWidth type="email" name="email" label="Email" />
          </div>
          <div className="form-group">
            <Select
              name="maLoaiNguoiDung"
              label="Người dùng"
              options={typeUser}
            />
          </div>
          <div className="container mb-3">
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
