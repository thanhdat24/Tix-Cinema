import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DANG_NHAP_ACTION,
  GET_USER_LIST_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  SET_THONG_TIN_NGUOI_DUNG,
  RESET_USER_MANAGEMENT,
} from "../actions/types/UserManagementType";

// let user = {};
// if (localStorage.getItem(USER_LOGIN)) {
//   user = JSON.parse(localStorage.getItem(USER_LOGIN));
// }
const userLogin = localStorage.getItem(USER_LOGIN)
  ? JSON.parse(localStorage.getItem(USER_LOGIN))
  : null;
const stateDefault = {
  userLogin: userLogin,
  thongTinNguoiDung: {},

  usersList: null,
  loadingUsersList: false,
  errorUsersList: null,

  successAddUser: null,
  loadingAddUser: false,
  errorAddUser: null,
};

export const UserManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      return { ...state, userLogin: thongTinDangNhap };
    }
    case SET_THONG_TIN_NGUOI_DUNG: {
      return { ...state, thongTinNguoiDung: action.thongTinNguoiDung };
    }
    case GET_USER_LIST_REQUEST: {
      return { ...state, loadingUsersList: true, errorUsersList: null };
    }
    case GET_USER_LIST_SUCCESS: {
      // state.usersList = action.payload;
      // state.usersListDefault = state.usersList;
      return {
        ...state,
        usersList: action.payload,
        loadingUsersList: false,
      };
    }
    case GET_USER_LIST_FAIL: {
      return {
        ...state,
        errorUsersList: action.payload.error,
        loadingUsersList: false,
      };
    }

    case ADD_USER_REQUEST: {
      return {
        ...state,
        loadingAddUser: true,
        errorAddUser: null,
        successAddUser: null,
      };
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state,
        loadingAddUser: false,
        successAddUser: action.payload,
        errorAddUser: null,
      };
    }
    case ADD_USER_FAIL: {
      return {
        ...state,
        loadingAddUser: false,
        errorAddUser: action.payload.error,
        successAddUser: null,
      };
    }
    case RESET_USER_MANAGEMENT: {
      return {
        ...state,
        successAddUser: null,
        loadingAddUser: false,
        errorAddUser: null,
      };
    }
    default:
      return { ...state };
  }
};
