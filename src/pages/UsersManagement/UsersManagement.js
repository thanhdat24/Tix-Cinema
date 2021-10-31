import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CachedIcon from "@material-ui/icons/Cached";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { DataGrid } from "@material-ui/data-grid";
import { useStyles, DialogTitle, DialogContent } from "./styles";
import slugify from "slugify";
import { useSnackbar } from "notistack";
import Chip from "@material-ui/core/Chip";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAction,
  deleteUser,
  layDanhSachNguoiDungAction,
  updateUser,
  resetUserManagement,
} from "../../redux/actions/UserManagementAction";
import Action from "./Action";
import Form from "./Form";

import { Dialog } from "@material-ui/core";
export default function UsersManagement() {
  const classes = useStyles();
  const [usersListDisplay, setUsersListDisplay] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const clearSetSearch = useRef(0);
  const selectedUser = useRef(null);
  console.log("selectedUser", selectedUser);

  const { enqueueSnackbar } = useSnackbar();
  const {
    usersList,
    loadingAddUser,
    successAddUser,
    errorAddUser,
    loadingDeleteMovie,
    successDelete,
    errorDelete,
    loadingUpdateUser,
    successUpdateUser,
    errorUpdateUser,
  } = useSelector((state) => state.UserManagementReducer);
  const dispatch = useDispatch();
  console.log("usersList", usersList);

  useEffect(() => {
    // get list user lần đầu
    if (
      !usersList ||
      successAddUser ||
      errorAddUser ||
      successDelete ||
      errorDelete ||
      successUpdateUser ||
      errorUpdateUser
    ) {
      dispatch(layDanhSachNguoiDungAction());
    }
  }, [
    successAddUser,
    errorAddUser,
    successDelete,
    errorDelete,
    successUpdateUser,
    errorUpdateUser,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetUserManagement());
    };
  }, []);

  useEffect(() => {
    if (usersList) {
      let newUsersListDisplay = usersList.map((user) => ({
        ...user,
        id: user.taiKhoan,
      }));
      setUsersListDisplay(newUsersListDisplay);
    }
  }, [usersList]);

  const handleEdit = (userItem) => {
    selectedUser.current = userItem;
    setOpenModal(true);
  };

  const onUpdate = (userObj) => {
    console.log("userObj", userObj);
    if (loadingUpdateUser) {
      return undefined;
    }
    setOpenModal(false);

    dispatch(updateUser(userObj));
  };

  const onAddUser = (userObj) => {
    if (!loadingAddUser) {
      dispatch(addUserAction(userObj));
    }

    setOpenModal(false);
  };

  const handleAddUser = () => {
    const emtySelectedUser = {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      maNhom: "",
      soDt: "",
      maLoaiNguoiDung: "",
    };
    selectedUser.current = emtySelectedUser;
    setOpenModal(true);
  };

  useEffect(() => {
    if (successAddUser) {
      enqueueSnackbar(`Thêm thành công tài khoản: ${successAddUser.taiKhoan}`, {
        variant: "success",
      });
    }
    if (errorAddUser) {
      enqueueSnackbar(errorAddUser, { variant: "error" });
    }
  }, [successAddUser, errorAddUser]);

  useEffect(() => {
    if (successUpdateUser) {
      enqueueSnackbar(
        `Update thành tài khoản: ${successUpdateUser.taiKhoan ?? ""}`,
        { variant: "success" }
      );
    }
    if (errorUpdateUser) {
      enqueueSnackbar(`${errorUpdateUser ?? ""}`, { variant: "error" });
    }
  }, [successUpdateUser, errorUpdateUser]);

  useEffect(() => {
    if (successDelete) {
      enqueueSnackbar(successDelete, { variant: "success" });
      return;
    }
    if (errorDelete) {
      enqueueSnackbar(errorDelete, { variant: "error" });
    }
  }, [successDelete, errorDelete]);

  // xóa một user
  const handleDeleteOne = (taiKhoan) => {
    if (!loadingDeleteMovie) {
      // nếu click xóa liên tục một user
      dispatch(deleteUser(taiKhoan)); // delete
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleInputSearchChange = (props) => {
    clearTimeout(clearSetSearch.current);
    clearSetSearch.current = setTimeout(() => {
      setValueSearch(props);
    }, 500);
  };
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
      const matchmaLoaiNguoiDung =
        slugify(user.maLoaiNguoiDung ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      return (
        matchTaiKhoan ||
        matchMatKhau ||
        matchEmail ||
        matchSoDt ||
        matchHoTen ||
        matchmaLoaiNguoiDung
      );
    });
    return searchUsersListDisplay;
  };

  const columns =
    // cột tài khoản không được chỉnh sửa, backend dùng "taiKhoan" để định danh user
    [
      {
        field: "taiKhoan",
        headerName: "Tài Khoản",
        width: 180,

        headerAlign: "center",
        align: "left",
        headerClassName: "custom-header",
      },
      {
        field: "matKhau",
        headerName: "Mật Khẩu",
        width: 170,
        headerAlign: "center",
        align: "left",
        headerClassName: "custom-header",
      },
      {
        field: "hoTen",
        headerName: "Họ tên",
        width: 190,
        headerAlign: "center",
        align: "left",
        headerClassName: "custom-header",
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
        headerAlign: "center",
        align: "left",
        headerClassName: "custom-header",
      },
      {
        field: "soDt",
        headerName: "Số điện thoại",
        width: 180,
        type: "number",
        headerAlign: "center",
        align: "left",
        headerClassName: "custom-header",
      },
      {
        field: "maLoaiNguoiDung",
        headerName: "Người dùng",
        type: "text",
        width: 160,
        headerAlign: "center",
        align: "center",
        headerClassName: "custom-header",
        renderCell: (params) => (
          <Chip
            label={params.value}
            className={
              params.value === "KhachHang"
                ? `${classes.khachHang}`
                : `${classes.quanTri}`
            }
            variant="outlined"
          />
        ),
      },
      {
        field: "xoa",
        headerName: "Hành động",
        width: 150,
        renderCell: (params) => (
          <Action
            onEdit={handleEdit}
            onDeleted={handleDeleteOne}
            userItem={params.row}
          />
        ),
        headerAlign: "center",
        align: "left",
        headerClassName: "custom-header",
      },
    ];

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
              disabled
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
              disabled
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
              disabled
            >
              làm mới
            </Button>
          </div>
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loadingAddUser}
              startIcon={<PersonAddIcon />}
              onClick={handleAddUser}
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
              disabled
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
                onChange={(evt) => handleInputSearchChange(evt.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <DataGrid
        className={classes.rootDataGrid}
        rows={onFilter()}
        columns={columns}
        // hiện loading khi
        loading={loadingAddUser || loadingDeleteMovie || loadingUpdateUser}
        pageSize={25}
        // hiện loading khi
        rowsPerPageOptions={[25, 50, 100]}
        // css màu cho tài khoản QuanTri hoặc KhachHang: thay đổi tên class row dựa trên giá trị prop riêng biệt của row
        getRowClassName={(params) => {
          return params.row.maLoaiNguoiDung === "KhachHang"
            ? "isadmin--KhachHang"
            : "isadmin--QuanTri";
        }}
        disableSelectionOnClick
        getRowId={(row) => row.taiKhoan}
      />

      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        open={openModal}
        // className={classes.rootDialog}
      >
        <DialogTitle onClose={() => setOpenModal(false)}>
          {" "}
          {selectedUser?.current?.taiKhoan
            ? `Sửa user: ${selectedUser?.current?.taiKhoan}`
            : "Thêm user"}
        </DialogTitle>
        <DialogContent dividers>
          <Form
            selectedUser={selectedUser.current}
            onUpdate={onUpdate}
            onAddUser={onAddUser}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
