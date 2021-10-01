import { cinemaManagementService } from "../../services/CinemaManagementService";

import { STATUS_CODE } from "../../util/settings/config";
import {
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
