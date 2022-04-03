import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Checkout from "./Checkout/Checkout";
import Modal from "./Modal";
import { getListSeat } from "../../redux/actions/BookingTicketManagementAction";
import {
  INIT_DATA,
  RESET_DATA_BOOKTICKET,
} from "../../redux/actions/types/BookingTicketManagementType";

export default function Index() {
  const { isLazy } = useSelector((state) => state.lazyReducer);
  const {
    loadingGetListSeat,
    refreshKey,
    timeOut,
    isMobile,
    danhSachPhongVe: { thongTinPhim, danhSachGhe },
    errorGetListSeatMessage,
  } = useSelector((state) => state.BookingTicketManagementReducer);
  const { userLogin } = useSelector((state) => state.UserManagementReducer);
  const param = useParams();
  const dispatch = useDispatch();
  const loading = isLazy || loadingGetListSeat;

  useEffect(() => {
    // lấy thongTinPhim và danhSachGhe
    dispatch(getListSeat(param.maLichChieu));
    return () => {
      // xóa dữ liệu khi đóng hủy component
      dispatch({ type: RESET_DATA_BOOKTICKET });
    };
  }, []);

  useEffect(() => {
    // sau khi lấy được danhSachPhongVe thì khởi tạo data
    let initCode = 64;
    const danhSachGheEdit = danhSachGhe?.map((seat, i) => {
      // thêm label A01, thêm flag selected: false
      if (i % 16 === 0) initCode++;
      const txt = String.fromCharCode(initCode);
      const number = ((i % 16) + 1).toString().padStart(2, 0);
      return { ...seat, label: txt + number, selected: false };
    });
    dispatch({
      type: INIT_DATA,
      payload: {
        listSeat: danhSachGheEdit,
        maLichChieu: thongTinPhim?.maLichChieu,
        taiKhoanNguoiDung: userLogin?.taiKhoan,
        email: userLogin?.email,
        phone: userLogin?.soDT,
      },
    });
  }, [danhSachGhe, userLogin, timeOut]);

  if (errorGetListSeatMessage) {
    return <div>{errorGetListSeatMessage}</div>;
  }
  return (
    <div style={{ display: loading ? "none" : "block" }}>
      {<Checkout key={refreshKey + 1} />}
      <Modal />
    </div>
  );
}
