import { connection } from "../../index";
import { bookingTicketManagementService } from "../../services/BookingTicketManagementService";
import { STATUS_CODE } from "../../util/settings/config";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import {
  CHANGE_STATUS,
  DAT_GHE_SUCCESS,
  DAT_GHE,
  SET_LIST_PHONG_VE,
  CREATE_SHOWTIME_REQUEST,
  CREATE_SHOWTIME_SUCCESS,
  CREATE_SHOWTIME_FAIL,
  RESET_CREATE_SHOWTIME,
} from "./types/BookingTicketManagementType";
import bookingApi from "../../api/bookingApi";

import { DISPLAY_LOADING, HIDE_LOADING } from "./types/LoadingType";
export const layDanhSachPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await bookingTicketManagementService.layDanhSachPhongVe(
        maLichChieu
      );
      // Đưa lên reducer
      console.log("result", result);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_LIST_PHONG_VE,
          danhSachPhongVe: result.data.content,
        });
      }
    } catch (errors) {
      console.log("errors", errors);
      console.log("errors", errors.response?.data);
    }
  };
};

export const layThongTinDatVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  // ghi cũng đc không ghi cũng đc: giá trị mặt định
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);

      const result = await bookingTicketManagementService.layThongTinDatVe(
        thongTinDatVe
      );
      console.log("result", result);
      // Đặt vé thành công gọi lại api load lại phòng vé
      await dispatch(layDanhSachPhongVeAction(thongTinDatVe.maLichChieu));
      await dispatch({ type: DAT_GHE_SUCCESS });
      await dispatch(hideLoadingAction);
      await dispatch({ type: CHANGE_STATUS });
    } catch (errors) {
      console.log("errors", errors);
      console.log("errors", errors.response?.data);
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  // redux thunk hộ trợ getState để giúp lấy dữ liệu từ store từ các reducer khác
  return async (dispatch, getState) => {
    // Đưa thông tin ghế lên reducers
    await dispatch({
      type: DAT_GHE,
      gheDuocChon: ghe,
    });

    // Call api về backend
    let danhSachGheDangDat =
      getState().BookingTicketManagementReducer.danhsachGheDangDat;

    let taiKhoan = getState().UserManagementReducer.userLogin.taiKhoan;

    console.log("danhSachGheDangDat", danhSachGheDangDat);
    console.log("taiKhoan", taiKhoan);
    console.log("maLichChieu", maLichChieu);
    //Biến mảng thành chuỗi
    // danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
    // console.log("danhSachGheDangDat", danhSachGheDangDat);

    //Call api signalR
    // connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};

export const createShowtime = (data) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_SHOWTIME_REQUEST,
    });
    bookingApi
      .postTaoLichChieu(data)
      .then((result) => {
        dispatch({
          type: CREATE_SHOWTIME_SUCCESS,
          payload: result.data.content,
        });
      })
      .catch((error) => {
        dispatch({
          type: CREATE_SHOWTIME_FAIL,
          payload: {
            error: error.response?.data ? error.response.data : error.message,
          },
        });
      });
  };
};
export const resetCreateShowtime = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_CREATE_SHOWTIME,
    });
  };
};
