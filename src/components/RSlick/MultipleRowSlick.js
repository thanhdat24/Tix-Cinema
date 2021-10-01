import React, { Component } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styleSlick from "./MultipleRowSlick.module.css";
import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/actions/types/FilmManagementType";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}

const MultipleRowSlick = (props) => {
  const settings = {
    className: "center",
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
    rows: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.FilmManagementReducer
  );
  const renderFilms = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      return (
        <div className="mt-5" key={index}>
          {/* <Film film={item} /> */}
          <Film_Flip film={item} />
        </div>
      );
    });
  };
  let activeFilmDC = dangChieu === true ? "active_film" : "disable_film";
  let activeFilmSC = sapChieu === true ? "active_film" : "disable_film";
  return (
    <div className="listFilm">
      <ul className="text-center flex justify-center listFilm__header">
        <li
          onClick={() => {
            const action = { type: SET_FILM_DANG_CHIEU };
            dispatch(action);
          }}
          className={` ${styleSlick[activeFilmDC]} mr-5 text-3xl font-medium cursor-pointer  uppercase `}
        >
          Đang Chiếu
        </li>
        <li
          onClick={() => {
            const action = { type: SET_FILM_SAP_CHIEU };
            dispatch(action);
          }}
          className={`${styleSlick[activeFilmSC]} ml-5 font-medium text-3xl cursor-pointer  uppercase`}
        >
          Sắp Chiếu
        </li>
      </ul>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRowSlick;
