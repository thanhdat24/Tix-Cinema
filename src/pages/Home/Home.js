import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Film from "../../components/Film/Film";
import HomeMenu from "./HomeMenu/HomeMenu";
import MultipleRowSlick from "../../components/RSlick/MultipleRowSlick";
import { getFilmManagementAction } from "../../redux/actions/FilmManagementAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/CinemaManagementAction";
import Carousel from "../Carousel/Carousel";
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
      <section className="text-gray-600 body-font">
        <div className="container px-36 py-24 mx-auto ">
          <MultipleRowSlick arrFilm={arrFilm} />
          {/* <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4"> 
            {renderFilms()}
          </div> */}
        </div>
      </section>
      <div className="mx-32">
        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </div>
  );
}
