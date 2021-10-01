import React, { useEffect } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../styles/circle.css";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment";
import { layThongTinChiTietPhimAction } from "../../redux/actions/CinemaManagementAction";
import { Radio, Space, Rate } from "antd";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;

export default function Detail(props) {
  const filmDetail = useSelector(
    (state) => state.FilmManagementReducer.filmDetail
  );

  console.log("filmDetail", filmDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    // Lấy thông tin param từ url
    let { id } = props.match.params;

    dispatch(layThongTinChiTietPhimAction(id));
  }, []);
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${filmDetail.hinhAnh})`,
          minHeight: "7vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <CustomCard
          style={{ paddingTop: 150, minHeight: "70vh" }}
          effectColor="#000" // required
          color="#14AEFF" // default color is white
          blur={10} // default blur value is 10px
          borderRadius={0} // default border radius value is 10px
        >
          <div className="grid grid-cols-12">
            <div className="col-span-4 col-start-4">
              <div className="grid grid-cols-2">
                <img src={filmDetail.hinhAnh} alt="123" />
                <div className="ml-3 self-center text-white">
                  <p>{moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}</p>
                  <p className="text-2xl font-bold">{filmDetail.tenPhim}</p>
                  <p></p>
                </div>
              </div>
            </div>
            <div className="col-span-4  col-start-9">
              <h1
                style={{
                  marginLeft: "15%",
                  color: "yellow",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Đánh giá
              </h1>
              <h1
                style={{ marginLeft: "5%" }}
                className="text-green-400 text-2xl"
              >
                <Rate
                  allowHalf
                  value={filmDetail.danhGia / 2}
                  style={{ color: "#78ed78", fontSize: 30 }}
                />
              </h1>
              <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                <span className="font-bold text-3xl">
                  {filmDetail.danhGia * 10}%
                </span>
                <div className="slice">
                  <div className="bar" />
                  <div className="fill" />
                </div>
              </div>
            </div>
          </div>
        </CustomCard>
      </div>
      <Tabs
        defaultActiveKey="1"
        centered
        style={{
          backgroundColor: "rgb(10, 32, 41)",
          color: "#fff",
        }}
      >
        <TabPane tab="Lịch chiếu" key="1">
          <div className="container m-72 w-2/3 my-20 px-5 py-5 bg-white">
            <Tabs tabPosition={"left"}>
              {filmDetail.heThongRapChieu?.map((htr, index) => {
                return (
                  <TabPane
                    tab={
                      <div className="flex flex-rơ items-center justify-center">
                        <img src={htr.logo} alt={htr.maHeThongRap} width="50" />

                        <p className="ml-3 text-black text-lg">
                          {htr.tenHeThongRap}
                        </p>
                      </div>
                    }
                    key={index}
                  >
                    {htr.cumRapChieu?.map((cumRap, index) => {
                      return (
                        <div key={index} className="mt-10">
                          <div className="flex flex-row">
                            <img
                              src={cumRap.hinhAnh}
                              alt={cumRap.tenCumRap}
                              style={{ width: 70, height: 70 }}
                            />
                            <div className="ml-3 font-bold">
                              <p className="text-lg mb-1">
                                {" "}
                                {cumRap.tenCumRap}
                              </p>
                              <p className="text-gray-500 text-md">
                                {cumRap.diaChi.length > 31 ? (
                                  <p>{cumRap.diaChi.slice(0, 31)}...</p>
                                ) : (
                                  <p>{cumRap.diaChi}</p>
                                )}
                              </p>
                              <div className="detailInfo grid grid-cols-4 gap-5">
                                {cumRap.lichChieuPhim
                                  ?.slice(0, 7)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        to="/"
                                        className="col-span-1 text-green-500 font-bold py-1 px-2 rounded-md"
                                        key={index}
                                        style={{
                                          backgroundColor:
                                            "rgb(182 182 182 / 17%)",
                                        }}
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </TabPane>
                );
              })}
            </Tabs>
          </div>
        </TabPane>
        <TabPane tab="Thông tin" key="2">
          Thông tin
        </TabPane>
        <TabPane tab="Đánh giá" key="3">
          Đánh giá
        </TabPane>
      </Tabs>
    </div>
  );
}
