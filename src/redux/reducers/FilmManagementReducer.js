import { SET_CHI_TIET_PHIM } from "../actions/types/CinemaManagementType";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
  SET_LIST_FILM,
} from "../actions/types/FilmManagementType";
import {
  ADD_MOVIE_UPLOAD_FAIL,
  ADD_MOVIE_UPLOAD_SUCCESS,
  GET_MOVIE_LIST_FAIL,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
} from "../actions/types/MovieType";

const initialState = {
  arrFilm: [],
  loadingMovieList: false,
  successAddUploadMovie: null,
  errorMovieList: null,
  arrFilmDefault: [],

  dangChieu: true,
  sapChieu: true,

  filmDetail: {},
};

export const FilmManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST_FILM: {
      state.arrFilm = action.arrFilm;
      state.arrFilmDefault = state.arrFilm;

      return { ...state };
    }
    case SET_FILM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;

      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }
    case SET_FILM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;

      state.arrFilm = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }

    case SET_CHI_TIET_PHIM: {
      return { ...state, filmDetail: action.filmDetail };
    }
    case ADD_MOVIE_UPLOAD_SUCCESS: {
      return {
        ...state,
        successAddUploadMovie: action.payload.data,
      };
    }
    case ADD_MOVIE_UPLOAD_FAIL: {
      return {
        ...state,
        errorAddUploadMovie: action.payload.error,
      };
    }
    case GET_MOVIE_LIST_REQUEST: {
      return { ...state, loadingMovieList2: true, errorMovieList2: null };
    }
    case GET_MOVIE_LIST_SUCCESS: {
      return {
        ...state,
        arrFilmDefault: action.payload.data,
      };
    }
    case GET_MOVIE_LIST_FAIL: {
      return {
        ...state,
        errorMovieList2: action.payload.errorMovieList,
      };
    }
    default:
      return { ...state };
  }
};
