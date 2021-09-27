import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getCarouselAction } from "../../../../redux/actions/CarouselAction";
const contentStyle = {
  height: "800px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  // backgroundPosition: "center",
  // backgroundSize: "cover",
  // backgroundRepeat: "no-repeat",
};

export default function HomeCarousel(props) {
  const { arrBanner } = useSelector((state) => state.CarouselReducer);

  const dispatch = useDispatch();
  // Sẻ tự kích hoạt khi component load ra
  useEffect(() => {
    dispatch(getCarouselAction());
  });

  const renderBanner = () => {
    return arrBanner.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={contentStyle}
            // style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img src={item.hinhAnh} className="w-full" alt={item.maPhim} />
          </div>
        </div>
      );
    });
  };
  return <Carousel className="">{renderBanner()}</Carousel>;
}
