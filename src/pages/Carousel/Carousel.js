import React from "react";
import Slider from "react-slick";
import useStyles from "./styles";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { useHistory } from "react-router-dom";
import homeCarouselData from "../../constants/homeCarouselData";
import "./Carousel.css";

export default function Carousel() {
  const history = useHistory();

  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 5000, //speed per sence
    autoplay: false,
    speed: 500,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slickdotsbanner",
  };
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <ArrowForwardIosRoundedIcon
        style={{ right: "15px" }}
        onClick={onClick}
        className={classes.Arrow}
      />
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <ArrowBackIosRoundedIcon
        style={{ left: "15px" }}
        onClick={onClick}
        className={classes.Arrow}
      />
    );
  }

  return (
    <div id="carousel" className={classes.carousel}>
      <Slider {...settings}>
        {homeCarouselData.map((item) => {
          return (
            <div key={item.maPhim} className={classes.itemSlider}>
              <img src={item?.hinhAnh} alt="banner" className={classes.img} />
              <div
                className={classes.backgroundLinear}
                onClick={() => history.push(`/detail/${item.maPhim}`)}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
