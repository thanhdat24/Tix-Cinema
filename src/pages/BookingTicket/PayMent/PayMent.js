import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinDatVeAction } from "../../../redux/actions/BookingTicketManagementAction";
import formatDate from "../../../util/settings/formatDate";
import { ThongTinDatVe } from "../../../_core/models/ThongTinDatVe";
import style from "./PayMent.module.css";
export default function PayMent(props) {
  const { danhSachPhongVe, danhsachGheDangDat, danhSachKhachDangDat } =
    useSelector((state) => state.BookingTicketManagementReducer);
  const { thongTinPhim, danhSachGhe } = danhSachPhongVe;
  const { userLogin } = useSelector((state) => state.UserManagementReducer);
  const dispatch = useDispatch();

  return (
    <aside className={` ${style["payMent"]}`}>
      <div>
        {/* tổng tiền */}
        <p className={`${style["amount"]} ${style["payMentItem"]}`}>
          {danhsachGheDangDat
            .reduce((tongTien, ghe, index) => {
              return (tongTien += ghe.giaVe);
            }, 0)
            .toLocaleString("vi-VI")}{" "}
          đ
        </p>
        <hr />

        {/* thông tin phim và rạp */}
        <div className={`${style["payMentItem"]}`}>
          <p className={`${style["tenPhim"]}`}>{thongTinPhim.tenPhim}</p>
          <p>{thongTinPhim.tenCumRap}</p>
          <p>{`${thongTinPhim && formatDate(thongTinPhim.ngayChieu).dayToday} ${
            thongTinPhim?.ngayChieu
          } - ${thongTinPhim?.gioChieu} - ${thongTinPhim?.tenRap}`}</p>
        </div>
        <hr />

        {/* ghế đã chọn */}
        <div className={`${style["seatInfo"]} ${style["payMentItem"]}`}>
          <div className="text-red-600 text-lg">
            <span>Ghế</span>
            {_.sortBy(danhsachGheDangDat, ["stt"]).map((gheDD, index) => {
              return <span key={index}> {gheDD.stt}</span>;
            })}
          </div>
          <div className="text-right col-span-1">
            <span className={`text-lg ${style["amountLittle"]}`}>
              {danhsachGheDangDat
                .reduce((tongTien, ghe, index) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}{" "}
              đ
            </span>
          </div>
        </div>
        <hr />

        {/* email */}
        <div className={`${style["payMentItem"]}`}>
          <label className={`${style["labelEmail"]} `}>E-Mail</label>
          <br />
          <input
            type="text"
            name="email"
            autoComplete="off"
            value={userLogin.email}
            className="w-full focus:outline-none"
          />
          {/* <p className={classes.error}>{dataSubmit.errors.email}</p> */}
        </div>
        <hr />

        {/* phone */}
        <div className="py-3">
          <label>Phone</label>
          <br />
          <input
            type="number"
            name="phone"
            value={userLogin.phone}
            autoComplete="off"
            className="w-full focus:outline-none"
          />
          {/* <p className={classes.error}>{dataSubmit.errors.phone}</p> */}
        </div>
        <hr />

        {/* Mã giảm giá */}
        <div className={`${style["payMentItem"]}`}>
          <label className={`${style["label"]}`}>Mã giảm giá</label>
          <br />
          <input
            className={`${style["fillIn"]}`}
            type="text"
            value="Tạm thời không hỗ trợ..."
            readOnly
          />
          <button className={`${style["btnDiscount"]}`} disabled>
            Áp dụng
          </button>
        </div>

        {/* hình thức thanh toán */}
        <div className={`${style["selectedPayMentMethod"]}`}>
          <label className={`${style["label"]}`}>Hình thức thanh toán</label>
          <br />
          <p className={`${style["toggleNotice"]}`}>
            Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp.
          </p>
        </div>

        {/* đặt vé */}
        <div
          className={`${style["bottomSection"]}`}
          style={{ marginBottom: 0 }}
        >
          <button
            className={`${style["btnDatVe"]}`}
            onClick={() => {
              const thongTinDatVe = new ThongTinDatVe();

              thongTinDatVe.maLichChieu = props.match.params.id;
              thongTinDatVe.danhSachVe = danhsachGheDangDat;

              console.log(thongTinDatVe);
              dispatch(layThongTinDatVeAction(thongTinDatVe));
            }}

            // disabled={!isReadyPayment}
            // onClick={handleBookTicket}
          >
            <p className={`${style["txtDatVe"]}`}>Đặt Vé</p>
          </button>
        </div>
      </div>
    </aside>
  );
}
