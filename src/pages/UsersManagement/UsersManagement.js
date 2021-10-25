import React, { useMemo, useState } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CachedIcon from "@material-ui/icons/Cached";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { DataGrid } from "@material-ui/data-grid";
import useStyles from "./styles";
import slugify from "slugify";
import { useSnackbar } from "notistack";

export default function UsersManagement() {
  const classes = useStyles();
  const [usersListDisplay, setUsersListDisplay] = useState([]);
  const [valueSearch, setValueSearch] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const onFilter = () => {
    const searchUsersListDisplay = usersListDisplay.filter((user) => {
      const matchTaiKhoan =
        slugify(user.taiKhoan ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchMatKhau =
        slugify(user.matKhau ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchEmail =
        slugify(user.email ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchSoDt =
        slugify(user.soDt ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchHoTen =
        slugify(user.hoTen ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      return (
        matchTaiKhoan || matchMatKhau || matchEmail || matchSoDt || matchHoTen
      );
    });
    return searchUsersListDisplay;
  };

  const columns = useMemo(
    () =>
      // cột tài khoản không được chỉnh sửa, backend dùng "taiKhoan" để định danh user
      [
        {
          field: "xoa",
          headerName: "Xóa",
          width: 120,
          headerAlign: "center",
          align: "center",
          headerClassName: "custom-header",
        },
        {
          field: "taiKhoan",
          headerName: "Tài Khoản",
          width: 200,

          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "matKhau",
          headerName: "Mật Khẩu",
          width: 250,
          editable: true,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "hoTen",
          headerName: "Họ tên",
          width: 200,
          editable: true,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "email",
          headerName: "Email",
          width: 250,
          editable: true,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "soDt",
          headerName: "Số điện thoại",
          width: 180,
          editable: true,
          type: "number",
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "maLoaiNguoiDung",
          headerName: "isAdmin",
          width: 145,
          editable: true,
          type: "boolean",
          headerAlign: "center",
          align: "center",
          headerClassName: "custom-header",
        },
        {
          field: "ismodify",
          width: 0,
          type: "boolean",
          headerClassName: "custom-header",
          hide: true,
        },
      ],
    []
  );
  const modifySlugify = { lower: true, locale: "vi" };

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <div className="container-fluid pb-3">
        <div className="row">
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              Xoá user
            </Button>
          </div>
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
            >
              Cập nhật user
            </Button>
          </div>
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<CachedIcon />}
            >
              làm mới
            </Button>
          </div>
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<PersonAddIcon />}
            >
              thêm user
            </Button>
          </div>
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              className={`${classes.userKhachHang} ${classes.button}`}
            >
              User khách hàng
            </Button>
          </div>
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              className={`${classes.userQuanTri} ${classes.button}`}
            >
              User quản trị
            </Button>
          </div>
          <div className="col-12 pt-3 col-sm-6 col-md-4 col-lg-3">
            <Button
              variant="contained"
              className={`${classes.userModified} ${classes.button}`}
            >
              User đã chỉnh sửa
            </Button>
          </div>
          <div className="col-3 pt-3">
            <div className={`${classes.search} ${classes.button}`}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <DataGrid
        className={classes.rootDataGrid}
        rows={onFilter()}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25, 50, 100]}
        // bật checkbox
        checkboxSelection
      />
    </div>
  );
}
