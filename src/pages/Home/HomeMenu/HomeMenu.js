import React, { Fragment } from "react";
import { Tabs, Radio, Space } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";
import style from "./HomeMenu.module.css";
import ThoiLuongDanhGia from "../../../components/ThoiLuongDanhGia/thoiLuongDanhGia";
const { TabPane } = Tabs;
// Sử dụng PureComponent để giảm bớt việc render lại
export default class Demo extends React.PureComponent {
  state = {
    tabPosition: "left",
  };

  changeTabPosition = (e) => {
    this.setState({ tabPosition: e.target.value });
  };

  renderHeThongRap = () => {
    const { tabPosition } = this.state;
    return this.props.heThongRapChieu?.map((heThongRap, index) => {
      return (
        <TabPane
          tab={
            <img
              src={heThongRap.logo}
              className="rounded-full"
              width="50"
              alt={heThongRap.maHeThongRap}
            />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  className={`${style["TabPane"]}`}
                  tab={
                    <div className="flex flex-row">
                      <img
                        src={
                          "https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png"
                        }
                        width="50"
                        alt={cumRap.maCumRap}
                      />
                      <div className="ml-3 text-left font-medium">
                        <p className="text-green-600">{cumRap.tenCumRap}</p>
                        <p className="text-gray-500">
                          {cumRap.diaChi.length > 31 ? (
                            <p>{cumRap.diaChi.slice(0, 31)}...</p>
                          ) : (
                            <p>{cumRap.diaChi}</p>
                          )}
                        </p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {/* {Load phim tưƠng ứng} */}
                  {cumRap.danhSachPhim?.map((film, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="flex flex-row py-2 px-6 mb-4">
                          <img
                            style={{
                              height: 50,
                              width: 50,
                              objectFit: "cover",
                            }}
                            src={film.hinhAnh}
                            alt={film.tenPhim}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://picsum.photos/100/100";
                            }}
                          />
                          <div className={`${style["phim__text"]}`}>
                            <p className={`${style["phim__text_name"]}`}>
                              {film.tenPhim}
                            </p>
                            <ThoiLuongDanhGia maPhim={film.maPhim} />
                            {/* phải tách riêng ra vì thời lượng và đánh giá lấy từ một api khác */}
                          </div>
                        </div>
                        <div className={`${style["groupTime"]}`}>
                          {film.lstLichChieuTheoPhim
                            ?.slice(0, 10)
                            .map((lichChieu, index) => {
                              return (
                                <NavLink
                                  className="ml-3 text-base text-green-600 font-semibold hover:text-red-500"
                                  to={`/checkout/${lichChieu.maLichChieu}`}
                                  key={index}
                                >
                                  {moment(lichChieu.ngayChieuGioChieu).format(
                                    "hh:mm A"
                                  )}
                                </NavLink>
                              );
                            })}
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  render() {
    const { tabPosition } = this.state;
    return (
      <Fragment>
        <Tabs className={`${style["tabs"]}`} tabPosition={tabPosition}>
          {this.renderHeThongRap()}
        </Tabs>
      </Fragment>
    );
  }
}
