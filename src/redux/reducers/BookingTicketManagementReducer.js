import {
  CHANGE_STATUS,
  DAT_GHE,
  DAT_GHE_SUCCESS,
  SET_LIST_PHONG_VE,
  CHANGE_STATUS_ACTIVE,
  CREATE_SHOWTIME_REQUEST,
  CREATE_SHOWTIME_SUCCESS,
  CREATE_SHOWTIME_FAIL,
  RESET_CREATE_SHOWTIME,
} from "../actions/types/BookingTicketManagementType";
import { ThongTinPhongVe } from "../../_core/models/ThongTinPhongVe";
const stateDefault = {
  danhSachPhongVe: new ThongTinPhongVe(),
  danhsachGheDangDat: [],
  danhSachKhachDangDat: [{ maGhe: 52201 }, { maGhe: 52202 }],
  //  [{ maGhe: 52201 }, { maGhe: 52202 }],
  statusActive: 0,

  loadingCreateShowtime: false,
  successCreateShowtime: null,
  errorCreateShowtime: null,
};

export const BookingTicketManagementReducer = (
  state = stateDefault,
  action
) => {
  switch (action.type) {
    case SET_LIST_PHONG_VE: {
      return { ...state, danhSachPhongVe: action.danhSachPhongVe };
    }
    case DAT_GHE: {
      // Cập nhật danh sách ghế đang đặt
      let danhsachGheDangDatUpdate = [...state.danhsachGheDangDat];

      let index = danhsachGheDangDatUpdate.findIndex(
        (gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe
      );

      if (index !== -1) {
        //Nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã click vào rồi => xoá đi
        danhsachGheDangDatUpdate.splice(index, 1);
      } else {
        danhsachGheDangDatUpdate.push(action.gheDuocChon);
      }
      return { ...state, danhsachGheDangDat: danhsachGheDangDatUpdate };
    }

    case DAT_GHE_SUCCESS: {
      return { ...state, danhsachGheDangDat: [] };
    }
    case CHANGE_STATUS: {
      return { ...state, statusActive: 2 };
    }
    case CHANGE_STATUS_ACTIVE: {
      return { ...state, statusActive: action.number };
    }
    case "GHE_KHACH_DAT": {
      return { ...state, danhsachGheDangDat: action.arrGheKhachDat };
    }

    case CREATE_SHOWTIME_REQUEST: {
      return {
        ...state,
        loadingCreateShowtime: true,
        errorCreateShowtime: null,
      };
    }
    case CREATE_SHOWTIME_SUCCESS: {
      return {
        ...state,
        successCreateShowtime: action.payload,
        loadingCreateShowtime: false,
      };
    }
    case CREATE_SHOWTIME_FAIL: {
      return {
        ...state,
        errorCreateShowtime: action.payload.error,
        loadingCreateShowtime: false,
      };
    }

    case RESET_CREATE_SHOWTIME: {
      state.loadingCreateShowtime = false;
      state.successCreateShowtime = null;
      state.errorCreateShowtime = null;
      return state;
    }
    default:
      return state;
  }
};
