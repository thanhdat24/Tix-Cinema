import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Film from "../../components/Film/Film";
import HomeMenu from "./HomeMenu/HomeMenu";
import News from "../News/News";
import MultipleRowSlick from "../../components/RSlick/MultipleRowSlick";
import Showtime from "../Showtime/Showtime";
import { getFilmManagementAction } from "../../redux/actions/FilmManagementAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/CinemaManagementAction";
import Carousel from "../Carousel/Carousel";
import Seperate from "../../components/Seperate";
export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.FilmManagementReducer);
  const dispatch = useDispatch();
  const { heThongRapChieu } = useSelector(
    (state) => state.CinemaManagementReducer
  );
  useEffect(() => {
    // Danh sach film
    dispatch(getFilmManagementAction());
    // Danh sach he thong rap chieu
    dispatch(layDanhSachHeThongRapAction());
  }, []);
  return (
    <div>
      <Carousel />
      <section className="text-gray-600 body-font" id="lichchieu">
        <div className="container px-36 py-24 mx-auto ">
          <Showtime arrFilm={arrFilm} />
        </div>
      </section>
      <section className="mx-32" id="cumrap">
        <Seperate />
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </section>
      <News />
    </div>
  );
}
