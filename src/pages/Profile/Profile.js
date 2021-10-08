import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinNguoiDungAction } from "../../redux/actions/UserManagementAction";

export default function Profile() {
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
