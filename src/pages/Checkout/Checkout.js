import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./Checkout.module.css";
import { Tabs, Table } from "antd";
import { Steps, Divider } from "antd";
import {
  layDanhSachPhongVeAction,
  layThongTinDatVeAction,
  datGheAction,
} from "../../redux/actions/BookingTicketManagementAction";
import "./Checkout.css";
import formatDate from "../../util/settings/formatDate";
import {
  CHANGE_STATUS_ACTIVE,
  DAT_GHE,
} from "../../redux/actions/types/BookingTicketManagementType";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { layThongTinNguoiDungAction } from "../../redux/actions/UserManagementAction";
import { connection } from "../../index";
function Checkout(props) {
  const { userLogin } = useSelector((state) => state.UserManagementReducer);
  const { danhSachPhongVe, danhsachGheDangDat, danhSachKhachDangDat } =
    useSelector((state) => state.BookingTicketManagementReducer);
  const { thongTinPhim, danhSachGhe } = danhSachPhongVe;
  console.log("danhsachGheDangDat", danhsachGheDangDat);
  const dispatch = useDispatch();

  useEffect(() => {
    // Gọi hàm tạo ra 1 async function
    const action = layDanhSachPhongVeAction(props.match.params.id);
    // dispatch function
    dispatch(action);

    //Vừa vào trang load tất cả ghế của các người khác đang đặt
    connection.invoke("loadDanhSachGhe", props.match.params.id);

    // Load danh sách ghế đang đặt từ server về (lắng nghe tín hiệu từ server trả về)
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      console.log("danhSachGheKhachDat", dsGheKhachDat);

      // //Bước 1: Loại mình ra khỏi danh sách
      // dsGheKhachDat = dsGheKhachDat.filter(
      //   (item) => item.taiKhoan !== userLogin.taiKhoan
      // );

      // //Bước 2: gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung
      // let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
      //   // Biến chuỗi danhSachGhe thành mảng sử dụng JSON.parse
      //   let arrGhe = JSON.parse(item.danhSachGhe);

      //   return { ...result, ...arrGhe };
      // }, []);
      // // Loại bỏ những phần tử trùng trong mảng
      // // Đưa dữ liệu ghế khách đặt cập nhập redux
      // arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

      // // Đưa dữ liệu ghế khách đặt về redux
      // dispatch({ type: "GHE_KHACH_DAT", arrGheKhachDat });

      // //Cài đặt sự kiện khi reload trang
      // window.addEventListener("beforeunload", clearGhe);

      // return () => {
      //   clearGhe();
      //   window.removeEventListener("beforeunload", clearGhe);
      // };
    });
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
    <div className="h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            {/* mô phỏng màn hình */}
            <img
              className=""
              src="/assets/img/bookticket/screen.png"
              alt="screen"
            />
            <div>{renderSeats()}</div>
          </div>
          {/* thông tin các loại ghế */}
          <div className={`${style["noteSeat"]}`}>
            <div className="flex flex-row justify-evenly text-center w-4/5 m-auto">
              <div>
                <button className="loai-ghe"></button>
                <p>Ghế thường</p>
              </div>
              <div>
                <button className="loai-ghe loai-gheVip"></button>
                <p>Ghế vip</p>
              </div>
              <div>
                <button className="loai-ghe loai-gheDangDat"></button>
                <p>Ghế đang chọn</p>
              </div>
              <div>
                <button className="loai-ghe loai-gheDaDuocDat"></button>
                <p>Ghế đã có người đặt</p>
              </div>
              <div>
                <button className="loai-ghe loai-gheKhachDangDat"></button>
                <p>Ghế khách đang đặt</p>
              </div>
            </div>
          </div>
          {/* <div>
            <span>
              <span />
              <span>Ghế trung tâm</span>
            </span>
            <span>
              <span />
              <span>Ghế Đẹp</span>
            </span>
          </div> */}
        </div>
        <div className="col-span-3 ">
          <aside className={`px-8 ${style["checkout"]}`}>
            <div>
              {/* tổng tiền */}
              <p className="text-green-500 text-center text-4xl font-medium py-3">
                {danhsachGheDangDat
                  .reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                đ
              </p>
              <hr />

              {/* thông tin phim và rạp */}
              <div className="py-2">
                <p className="text-xl">{thongTinPhim.tenPhim}</p>
                <p>{thongTinPhim.tenCumRap}</p>
                <p>{`${
                  thongTinPhim && formatDate(thongTinPhim.ngayChieu).dayToday
                } ${thongTinPhim?.ngayChieu} - ${thongTinPhim?.gioChieu} - ${
                  thongTinPhim?.tenRap
                }`}</p>
              </div>
              <hr />
              {/* ghế đã chọn */}
              <div className="flex flex-row py-2 gap-8 justify-between">
                <div className="text-red-600 text-lg">
                  <span>Ghế</span>
                  {_.sortBy(danhsachGheDangDat, ["stt"]).map((gheDD, index) => {
                    return <span key={index}> {gheDD.stt}</span>;
                  })}
                </div>
                <div className="text-right col-span-1">
                  <span className="text-green-500 text-lg whitespace-nowrap">
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
              <div className="py-3">
                <label>E-Mail</label>
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
              <div className="py-3">
                <label>Mã giảm giá</label>
                <br />
                <input type="text" value="Tạm thời không hỗ trợ..." readOnly />
                <button disabled>Áp dụng</button>
              </div>

              {/* hình thức thanh toán */}
              <div className="py-3">
                <label>Hình thức thanh toán</label>
                <br />
                <p>
                  Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp.
                </p>
              </div>

              {/* đặt vé */}
              <div
                className="mb-0 h-full flex flex-col items-center"
                style={{ marginBottom: 0 }}
              >
                <button
                  onClick={() => {
                    const thongTinDatVe = new ThongTinDatVe();

                    thongTinDatVe.maLichChieu = props.match.params.id;
                    thongTinDatVe.danhSachVe = danhsachGheDangDat;

                    console.log(thongTinDatVe);
                    dispatch(layThongTinDatVeAction(thongTinDatVe));
                  }}
                  className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl"
                  // disabled={!isReadyPayment}
                  // onClick={handleBookTicket}
                >
                  <p>Đặt Vé</p>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutTab(props) {
  const { TabPane } = Tabs;
  const { statusActive } = useSelector(
    (state) => state.BookingTicketManagementReducer
  );
  const dispatch = useDispatch();
  // const { Step } = Steps;

  // const steps = [
  //   {
  //     title: "First",
  //     content: <Checkout {...props} />,
  //   },
  //   {
  //     title: "Second",
  //     content: <KetQuaDatVe {...props} />,
  //   },
  //   {
  //     title: "Last",
  //     content: "Last-content",
  //   },
  // ];
  return (
    <div className="p-5">
      <Tabs
        defaultActiveKey="1"
        activeKey={statusActive}
        onChange={(key) => {
          dispatch({ type: CHANGE_STATUS_ACTIVE, number: key });
        }}
      >
        <TabPane tab="CHỌN GHẾ" key="1">
          <Checkout {...props} />
        </TabPane>
        <TabPane tab="THANH TOÁN" key="2">
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
      {/* <Steps size="small" progressDot current={2}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps> */}
      {/* <div className="steps-content">{steps[0].content}</div> */}
    </div>
  );
}

function KetQuaDatVe(props) {
  const { thongTinNguoiDung } = useSelector(
    (state) => state.UserManagementReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
  }, []);
  console.log("ThongTinNguoiDung", thongTinNguoiDung);

  // lấy id ghế để render ra nhiều ghê
  const getIdSeat = (danhSachGhe) => {
    return danhSachGhe
      .reduce((listSeat, seat) => {
        return [...listSeat, seat.tenGhe];
      }, [])
      .join(", ");
  };

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr className="whitespace-nowrap">
              <th scope="col">Stt</th>
              <th scope="col">Tên phim</th>
              <th scope="col">Thời lượng phim</th>
              <th scope="col">Ngày đặt</th>
              <th scope="col">Tên Rạp</th>
              <th scope="col">Mã vé</th>
              <th scope="col">Tên ghế</th>
              <th scope="col">Giá vé(vnđ)</th>
              <th scope="col">Tổng tiền(vnđ)</th>
            </tr>
          </thead>
          <tbody>
            {thongTinNguoiDung.thongTinDatVe
              ?.map((user, index) => (
                <tr key={user.maVe} className="whitespace-nowrap">
                  <th scope="row">{index + 1}</th>
                  <td>{user.tenPhim}</td>
                  <td>{user.thoiLuongPhim}</td>
                  <td>
                    {new Date(user.ngayDat).toLocaleDateString()},{" "}
                    {new Date(user.ngayDat).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    {user.danhSachGhe[0].tenHeThongRap},{" "}
                    {user.danhSachGhe[0].tenRap}
                  </td>
                  <td>{user.maVe}</td>
                  <td>{getIdSeat(user.danhSachGhe)}</td>
                  <td>
                    {new Intl.NumberFormat("it-IT", {
                      style: "decimal",
                    }).format(user.giaVe)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("it-IT", {
                      style: "decimal",
                    }).format(user.giaVe * user.danhSachGhe.length)}
                  </td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
