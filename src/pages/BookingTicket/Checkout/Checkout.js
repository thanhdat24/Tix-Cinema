import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./Checkout.module.css";
import { Tabs, Table, Button } from "antd";
import { Steps, Divider } from "antd";
import {
  layDanhSachPhongVeAction,
  layThongTinDatVeAction,
  datGheAction,
} from "../../../redux/actions/BookingTicketManagementAction";
import "./Checkout.css";
import formatDate from "../../../util/settings/formatDate";
import {
  CHANGE_STATUS_ACTIVE,
  DAT_GHE,
} from "../../../redux/actions/types/BookingTicketManagementType";
import _ from "lodash";
import { ThongTinDatVe } from "../../../_core/models/ThongTinDatVe";
import { layThongTinNguoiDungAction } from "../../../redux/actions/UserManagementAction";
import { connection } from "../../../index";
import { history } from "../../../App";
import StepCheckout from "../StepCheckout/StepCheckout";
import ListSeat from "../ListSeat/ListSeat";
import PayMent from "../PayMent/PayMent";
export default function Checkout(props) {
  const { userLogin } = useSelector((state) => state.UserManagementReducer);

  const { danhSachPhongVe, danhsachGheDangDat, danhSachKhachDangDat } =
    useSelector((state) => state.BookingTicketManagementReducer);
  const { thongTinPhim, danhSachGhe } = danhSachPhongVe;
  const dispatch = useDispatch();

  return (
    <div className={`${style["bookTicked"]}`}>
      <section className={`${style["left"]}`}>
        <StepCheckout {...props} />
        <ListSeat {...props} />
      </section>
      <section className={`${style["right"]}`}>
        <PayMent {...props} />
      </section>
    </div>
  );
}
