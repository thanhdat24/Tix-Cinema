import { userManagementService } from "../../services/UserManagementService";
import { STATUS_CODE } from "../../util/settings/config";
import {
  DANG_NHAP_ACTION,
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
