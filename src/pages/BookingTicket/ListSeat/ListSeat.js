import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  datGheAction,
  layDanhSachPhongVeAction,
} from "../../../redux/actions/BookingTicketManagementAction";
import SeatIcon from "@material-ui/icons/CallToActionRounded";

import useStyles from "./style";
import { logoTheater } from "../../../constants/theaterData";
import TenCumRap from "../../../components/TenCumRap";
import formatDate from "../../../util/settings/formatDate";

export default function ListSeat(props) {
  const { userLogin } = useSelector((state) => state.UserManagementReducer);
  const { danhSachPhongVe, danhsachGheDangDat, danhSachKhachDangDat } =
    useSelector((state) => state.BookingTicketManagementReducer);
  const { danhSachGhe, thongTinPhim } = danhSachPhongVe;
  console.log("danhsachGheDangDat", danhsachGheDangDat);
  const [widthSeat, setWidthSeat] = useState(0);

  const dispatch = useDispatch();
  const classes = useStyles({
    modalLeftImg: thongTinPhim?.hinhAnh,
    widthLabel: widthSeat / 2,
  });

  useEffect(() => {
    // Gọi hàm tạo ra 1 async function
    const action = layDanhSachPhongVeAction(props.match.params.id);
    // dispatch function
    dispatch(action);

    //Vừa vào trang load tất cả ghế của các người khác đang đặt
    // connection.invoke("loadDanhSachGhe", props.match.params.id);

    // Load danh sách ghế đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
    // connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
    //   console.log("danhSachGheKhachDat", dsGheKhachDat);

    //   // //Bước 1: Loại mình ra khỏi danh sách
    //   // dsGheKhachDat = dsGheKhachDat.filter(
    //   //   (item) => item.taiKhoan !== userLogin.taiKhoan
    //   // );

    //   // //Bước 2: gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung
    //   // let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
    //   //   // Biến chuỗi danhSachGhe thành mảng sử dụng JSON.parse
    //   //   let arrGhe = JSON.parse(item.danhSachGhe);

    //   //   return { ...result, ...arrGhe };
    //   // }, []);
    //   // // Loại bỏ những phần tử trùng trong mảng
    //   // // Đưa dữ liệu ghế khách đặt cập nhập redux
    //   // arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

    //   // // Đưa dữ liệu ghế khách đặt về redux
    //   // dispatch({ type: "GHE_KHACH_DAT", arrGheKhachDat });

    //   // //Cài đặt sự kiện khi reload trang
    //   // window.addEventListener("beforeunload", clearGhe);

    //   // return () => {
    //   //   clearGhe();
    //   //   window.removeEventListener("beforeunload", clearGhe);
    //   // };
    // });
  }, []);
  // const clearGhe = function (event) {
  //   connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
  // };

  console.log({ danhSachPhongVe });
  // render hàng ghế
  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      // Kiểm tra từng ghế render xem có trong mảng ghế đang đặt ?
      let indexGheDD = danhsachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDD !== -1) {
        classGheDangDat = "gheDangDat";
      }

      // Kiểm tra từng ghế render xem có phải ghế khách đặt hay không
      let classGheKhachDat = "";
      let indexGheKD = danhSachKhachDangDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKD !== -1) {
        classGheKhachDat = "gheKhachDat";
      }

      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      return (
        <Fragment>
          {" "}
          <button
            onClick={() => {
              dispatch(datGheAction(ghe, props.match.params.id));
            }}
            disabled={ghe.daDat || classGheKhachDat !== ""}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`}
            key={index}
          >
            {ghe.daDat}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <main className={classes.listSeat}>
      {/* thông tin phim */}
      <div className={classes.info_CountDown}>
        <div className={classes.infoTheater}>
          <img
            src={logoTheater[thongTinPhim?.tenCumRap.slice(0, 3).toUpperCase()]}
            alt="phim"
            style={{ width: 50, height: 50 }}
          />
          <div className={classes.text}>
            <TenCumRap tenCumRap={thongTinPhim?.tenCumRap} />
            <p className={classes.textTime}>{`${
              thongTinPhim && formatDate(thongTinPhim.ngayChieu).dayToday
            } - ${thongTinPhim?.gioChieu} - ${thongTinPhim?.tenRap}`}</p>
          </div>
        </div>
        <div className={classes.countDown}>
          <p className={classes.timeTitle}>Thời gian giữ ghế</p>
          {/* <Countdown /> */}
        </div>
      </div>
      <div className={classes.overflowSeat}>
        <div className={classes.invariantWidth}>
          {/* mô phỏng màn hình */}
          <img
            className=""
            src="/assets/img/bookticket/screen.png"
            alt="screen"
          />
          <div>{renderSeats()}</div>

          {/* thông tin các loại ghế */}
          <div className={classes.noteSeat}>
            <div className={classes.typeSeats}>
              <div>
                <SeatIcon style={{ color: "#3e515d", fontSize: 27 }} />
                <p>Ghế thường</p>
              </div>
              <div>
                <SeatIcon style={{ color: "#f7b500", fontSize: 27 }} />
                <p>Ghế vip</p>
              </div>
              <div>
                <SeatIcon style={{ color: "#44c020", fontSize: 27 }} />
                <p>Ghế đang chọn</p>
              </div>
              <div>
                <div style={{ position: "relative" }}>
                  <p className={classes.posiX}>x</p>
                  <SeatIcon style={{ color: "#99c5ff", fontSize: 27 }} />
                </div>
                <p>Ghế đã được mua</p>
              </div>
            </div>
            <div className={classes.positionView}>
              <span>
                <span className={classes.linecenter} />
                <span>Ghế trung tâm</span>
              </span>
              <span className={classes.line}>
                <span className={classes.linebeautiful} />
                <span>Ghế Đẹp</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* modalleft */}
      <div className={classes.modalleft}>
        <div className={classes.opacity}></div>
      </div>
    </main>
  );
}
