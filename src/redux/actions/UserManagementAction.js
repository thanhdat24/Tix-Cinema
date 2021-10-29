import { userManagementService } from "../../services/UserManagementService";
import { STATUS_CODE } from "../../util/settings/config";
import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DANG_NHAP_ACTION,
  GET_USER_LIST_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  RESET_USER_MANAGEMENT,
  SET_THONG_TIN_NGUOI_DUNG,
} from "./types/UserManagementType";

import { history } from "../../App";
export const layThongTinDangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await userManagementService.dangNhap(thongTinDangNhap);

      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
      }
      // Chuyển hướng trang Login về trang trước đó
      history.goBack();
      console.log("result", result);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await userManagementService.layThongTinNguoiDung();

      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
      console.log("result", result);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

// export const layDanhSachNguoiDungAction = () => {
//   return (dispatch) => {
//     dispatch({
//       type: GET_USER_LIST_REQUEST,
//     });
//     usersApi
//       .getDanhSachNguoiDung()
//       .then((result) => {
//         dispatch({
//           type: GET_USER_LIST_SUCCESS,
//           payload: result.data.content,
//         });
//       })
//       .catch((error) => {
//         dispatch({
//           type: GET_USER_LIST_FAIL,
//           payload: {
//             error: error.response?.data ? error.response.data : error.message,
//           },
//         });
//       });
//   };
// };

export const layDanhSachNguoiDungAction = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_USER_LIST_REQUEST,
    });
    try {
      const result = await userManagementService.getDanhSachNguoiDung();
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: GET_USER_LIST_SUCCESS,
          payload: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

// export const addUserAction = (user) => {
//   return (dispatch) => {
//     dispatch({
//       type: ADD_USER_REQUEST,
//     });
//     usersApi
//       .postThemNguoiDung(user)
//       .then((result) => {
//         dispatch({
//           type: ADD_USER_SUCCESS,
//           payload: result.data.content,
//         });
//       })
//       .catch((error) => {
//         dispatch({
//           type: ADD_USER_FAIL,
//           payload: {
//             error: error.response?.data ? error.response.data : error.message,
//           },
//         });
//         console.log("error", error);
//         console.log("error.response.data", error.response.data);
//       });
//   };
// };
export const addUserAction = (user) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_USER_REQUEST,
    });
    try {
      const result = await userManagementService.postThemNguoiDung(user);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: result.data.content,
        });
        console.log("result.data.content", result.data.content);
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", error.response?.data);
      console.log("error.response", error.response);
    }
  };
};

export const resetUserManagement = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_USER_MANAGEMENT,
    });
  };
};
