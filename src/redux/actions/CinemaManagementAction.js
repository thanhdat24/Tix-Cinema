import theatersApi from "../../api/theatersApi";
import { cinemaManagementService } from "../../services/CinemaManagementService";

import { STATUS_CODE } from "../../util/settings/config";
import {
  GET_THEATERS_SHOWTIME_FAIL,
  GET_THEATERS_SHOWTIME_REQUEST,
  GET_THEATERS_SHOWTIME_SUCCESS,
  SET_CHI_TIET_PHIM,
  SET_HE_THONG_RAP_CHIEU,
} from "./types/CinemaManagementType";

export const layDanhSachHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const result = await cinemaManagementService.layThongTinLichChieuRap();
      // Đưa lên reducer
      console.log("result", result.data);
      if (result.status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_HE_THONG_RAP_CHIEU,
          heThongRapChieu: result.data.content,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const layThongTinChiTietPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await cinemaManagementService.layThongTinLichChieuPhim(
        maPhim
      );
      // Đưa lên reducer
      console.log("result", result.data);
      if (result.status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: SET_CHI_TIET_PHIM,
          filmDetail: result.data.content,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const layDanhSachHeThongRap2Action = () => {
  return (dispatch) => {
    dispatch({
      type: GET_THEATERS_SHOWTIME_REQUEST,
    });
    theatersApi
      .getThongTinLichChieuHeThongRap()
      .then((result) => {
        dispatch({
          type: GET_THEATERS_SHOWTIME_SUCCESS,
          payload: result.data.content,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_THEATERS_SHOWTIME_FAIL,
          payload: {
            errorTheaterList: error.response?.data
              ? error.response.data
              : error.message,
          },
        });
      });
  };
};
