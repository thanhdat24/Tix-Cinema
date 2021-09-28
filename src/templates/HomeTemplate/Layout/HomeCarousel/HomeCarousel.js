import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import "./HomeCarousel.css";
import { getCarouselAction } from "../../../../redux/actions/CarouselAction";

const contentStyle = {
  height: "850px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

export default function HomeCarousel(props) {
  const { arrBanner } = useSelector((state) => state.CarouselReducer);

  const dispatch = useDispatch();

  //Sẽ tự kích hoạt khi component load ra
  useEffect(() => {
    //1 action = {type:'',data}
    //2 (phải cài middleware): callBackFunction (dispatch)

    // const action = getCarouselAction(1);

    dispatch(getCarouselAction());
  }, []);

  const renderBanner = () => {
    return arrBanner.map((item, index) => {
      return (
        <div key={index}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img src={item.hinhAnh} className=" opacity-0" alt={item.hinhAnh} />
          </div>
        </div>
      );
    });
  };

  return (
    <Carousel effect="fade" style={{ width: "100%", padding: 0, margin: 0 }}>
      {renderBanner()}
    </Carousel>
  );
}
