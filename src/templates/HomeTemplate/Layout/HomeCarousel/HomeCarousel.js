import React from "react";
import { Carousel } from "antd";
const contentStyle = {
  height: "634px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function HomeCarousel() {
  return (
    <Carousel className="">
      <div>
        <h3 style={contentStyle}>
          <img
            src="https://s3img.vcdn.vn/123phim/2021/04/trang-ti-16194117174325.jpg"
            className="w-full"
            alt="1"
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          {" "}
          <img
            src="https://s3img.vcdn.vn/123phim/2021/04/lat-mat-48h-16177782153424.png"
            className="w-full"
            alt="2"
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          {" "}
          <img
            src="https://s3img.vcdn.vn/123phim/2021/04/ban-tay-diet-quy-evil-expeller-16177781815781.png"
            className="w-full"
            alt="3"
          />
        </h3>
      </div>
    </Carousel>
  );
}
