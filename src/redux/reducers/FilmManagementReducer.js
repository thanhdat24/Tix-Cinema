import { SET_CHI_TIET_PHIM } from "../actions/types/CinemaManagementType";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
  SET_LIST_FILM,
} from "../actions/types/FilmManagementType";
import {
  ADD_MOVIE_UPLOAD_FAIL,
  ADD_MOVIE_UPLOAD_REQUEST,
  ADD_MOVIE_UPLOAD_SUCCESS,
  DELETE_MOVIE_FAIL,
  DELETE_MOVIE_REQUEST,
  DELETE_MOVIE_SUCCESS,
  GET_MOVIE_LIST_FAIL,
  GET_MOVIE_LIST_REQUEST,
  GET_MOVIE_LIST_SUCCESS,
  POST_UPDATE_MOVIE_FAIL,
  POST_UPDATE_MOVIE_REQUEST,
  POST_UPDATE_MOVIE_SUCCESS,
  RESET_MOVIE_MANAGEMENT,
} from "../actions/types/MovieType";

const initialState = {
  arrFilm: [],
  loadingMovieList: false,
  errorMovieList: null,
  arrFilmDefault: [],

  arrFilm2: null,
  dangChieu: true,
  sapChieu: true,

  successUpdateMovie: "",
  loadingUpdateMovie: false,
  errorUpdateMovie: null,

  successDeleteMovie: "",
  loadingDeleteMovie: false,
  errorDeleteMovie: null,

  successAddUploadMovie: "",
  loadingAddUploadMovie: false,
  errorAddUploadMovie: null,
  filmDetail: {},
};

const FilmManagementReducer = (state = initialState, action) => {
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

    case ADD_MOVIE_UPLOAD_REQUEST: {
      return {
        ...state,
        loadingAddUploadMovie: true,
        errorAddUploadMovie: null,
      };
    }
    case ADD_MOVIE_UPLOAD_SUCCESS: {
      return {
        ...state,
        successAddUploadMovie: action.payload,
        loadingAddUploadMovie: false,
      };
    }
    case ADD_MOVIE_UPLOAD_FAIL: {
      return {
        ...state,
        errorAddUploadMovie: action.payload,
        loadingAddUploadMovie: false,
      };
    }
    case GET_MOVIE_LIST_REQUEST: {
      return {
        ...state,
        loadingMovieList: true,
        errorMovieList: null,
      };
    }
    case GET_MOVIE_LIST_SUCCESS: {
      state.arrFilm = action.payload;
      state.arrFilmDefault = state.arrFilm;
      return {
        ...state,
        loadingMovieList: false,
      };
    }
    case GET_MOVIE_LIST_FAIL: {
      return {
        ...state,
        errorMovieList: action.payload,
        loadingMovieList: false,
      };
    }

    case POST_UPDATE_MOVIE_REQUEST: {
      return { ...state, loadingUpdateMovie: true, errorUpdateMovie: null };
    }
    case POST_UPDATE_MOVIE_SUCCESS: {
      return {
        ...state,
        successUpdateMovie: action.payload,
        loadingUpdateMovie: false,
      };
    }
    case POST_UPDATE_MOVIE_FAIL: {
      return {
        ...state,
        errorUpdateMovie: action.payload.error,
        loadingUpdateMovie: false,
      };
    }

    case DELETE_MOVIE_REQUEST: {
      return { ...state, loadingDeleteMovie: true, errorDeleteMovie: null };
    }
    case DELETE_MOVIE_SUCCESS: {
      return {
        ...state,
        successDeleteMovie: action.payload,
        loadingDeleteMovie: false,
      };
    }
    case DELETE_MOVIE_FAIL: {
      return {
        ...state,
        errorDeleteMovie: action.payload,
        loadingDeleteMovie: false,
      };
    }
    case RESET_MOVIE_MANAGEMENT: {
      return {
        ...state,
        loadingMovieList: false,
        errorMovieList: null,

        successDeleteMovie: "",
        loadingDeleteMovie: false,
        errorDeleteMovie: null,

        successUpdateMovie: "",
        loadingUpdateMovie: false,
        errorUpdateMovie: null,

        successAddUploadMovie: "",
        loadingAddUploadMovie: false,
        errorAddUploadMovie: null,
      };
    }
    default:
      return state;
  }
};
export default FilmManagementReducer;
