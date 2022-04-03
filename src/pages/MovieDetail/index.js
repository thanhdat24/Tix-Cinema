import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// import Mobile from './Mobile';
import Desktop from "./Desktop";
import { getMovieShowtimes } from "../../redux/actions/MovieDetail";
import { RESET_MOVIEDETAIL_REDUCER } from "../../redux/actions/types/MovieDetail";

export default function Index() {
  const { movieDetailShowtimes, errorMovieDetailShowtimes } = useSelector(
    (state) => state.movieDetailReducer
  );
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(function () {
    dispatch(getMovieShowtimes(param.maPhim));
    return () => {
      dispatch({ type: RESET_MOVIEDETAIL_REDUCER });
    };
  }, []);

  if (errorMovieDetailShowtimes) {
    return <div>{errorMovieDetailShowtimes}</div>;
  }
  return <>{<Desktop movieDetailShowtimes={movieDetailShowtimes} />}</>;
}
