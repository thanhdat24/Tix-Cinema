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
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  POST_UPDATE_USER_FAIL,
  POST_UPDATE_USER_SUCCESS,
  POST_UPDATE_USER_REQUEST,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  RESET_ERROR_LOGIN_REGISTER,
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

  successDelete: "",
  loadingDelete: false,
  errorDelete: null,

  successUpdateUser: "",
  loadingUpdateUser: false,
  errorUpdateUser: null,

  responseRegister: null,
  loadingRegister: false,
  errorRegister: null,
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
    case DELETE_USER_REQUEST: {
      return {
        ...state,
        loadingDelete: true,
        errorDelete: null,
        successDelete: "",
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        loadingDelete: false,
        successDelete: action.payload,
        errorDelete: null,
      };
    }
    case DELETE_USER_FAIL: {
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload.error,
        successDelete: "",
      };
    }
    case POST_UPDATE_USER_REQUEST: {
      return {
        ...state,
        loadingUpdateUser: true,
        errorUpdateUser: null,
        successUpdateUser: null,
      };
    }
    case POST_UPDATE_USER_SUCCESS: {
      return {
        ...state,
        successUpdateUser: action.payload,
        loadingUpdateUser: false,
        errorUpdateUser: null,
      };
    }
    case POST_UPDATE_USER_FAIL: {
      return {
        ...state,
        errorUpdateUser: action.payload.error,
        loadingUpdateUser: false,
        successUpdateUser: null,
      };
    }
    case LOGOUT: {
      localStorage.removeItem(USER_LOGIN);
      return {
        ...state,
        userLogin: null,
        error: null,
        loading: false,
        responseRegister: null,
      };
    }
    case REGISTER_REQUEST: {
      return { ...state, loadingRegister: true, errorRegister: null };
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        responseRegister: action.payload,
        loadingRegister: false,
      };
    }
    case RESET_USER_MANAGEMENT: {
      return {
        ...state,
        loadingUsersList: false,
        errorUsersList: null,

        loadingAddUser: "",
        successAddUser: null,
        errorAddUser: null,

        loadingDelete: false,
        successDelete: "",
        errorDelete: null,

        loadingUpdateUser: false,
        successUpdateUser: "",
        errorUpdateUser: null,
      };
    }
    case RESET_ERROR_LOGIN_REGISTER: {
      return {
        ...state,
        errorRegister: null,
        errorLogin: null,
      };
    }
    default:
      return { ...state };
  }
};
