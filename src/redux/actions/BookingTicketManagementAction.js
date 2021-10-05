import { bookingTicketManagementService } from "../../services/BookingTicketManagementService";
import { STATUS_CODE } from "../../util/settings/config";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import {
  CHANGE_STATUS,
  DAT_GHE_SUCCESS,
  SET_LIST_PHONG_VE,
} from "./types/BookingTicketManagementType";
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
