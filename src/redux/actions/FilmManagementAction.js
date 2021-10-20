import { filmManagementService } from "../../services/FilmManagementService";
import { SET_CAROUSEL } from "./types/CarouselType";
import { SET_LIST_FILM } from "./types/FilmManagementType";
import {
  ADD_MOVIE_UPLOAD_FAIL,
  ADD_MOVIE_UPLOAD_SUCCESS,
  GET_MOVIE_LIST_FAIL,
  GET_MOVIE_LIST_SUCCESS,
  POST_UPDATE_MOVIE_FAIL,
  POST_UPDATE_MOVIE_SUCCESS,
  POST_UPDATE_MOVIE_REQUEST,
  RESET_MOVIE_MANAGEMENT,
  GET_MOVIE_LIST_REQUEST,
  ADD_MOVIE_UPLOAD_REQUEST,
  DELETE_MOVIE_REQUEST,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAIL,
  UPDATE_NONEIMAGE_MOVIE_REQUEST,
  UPDATE_NONEIMAGE_MOVIE_SUCCESS,
  UPDATE_NONEIMAGE_MOVIE_FAIL,
} from "../actions/types/MovieType";
import moviesApi from "../../api/moviesApi";

export const getFilmManagementAction = () => {
  return async (dispatch) => {
    try {
      const result = await filmManagementService.layDanhSachPhim();
      dispatch({
        type: SET_LIST_FILM,
        arrFilm: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
export const getMovieListManagement = () => {
  return (dispatch) => {
    dispatch({
      type: GET_MOVIE_LIST_REQUEST,
    });
    moviesApi
      .getDanhSachPhim()
      .then((result) => {
        dispatch({
          type: GET_MOVIE_LIST_SUCCESS,
          payload: result.data.content,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_MOVIE_LIST_FAIL,
          payload: error.response?.data ? error.response.data : error.message,
        });
      });
  };
};

export const themPhimUploadHinhAction = (movieObj) => {
  return (dispatch) => {
    dispatch({
      type: ADD_MOVIE_UPLOAD_REQUEST,
    });
    moviesApi
      .themPhimUploadHinh(movieObj)
      .then((result) => {
        dispatch({
          type: ADD_MOVIE_UPLOAD_SUCCESS,
          payload: result.data.content,
        });
      })
      .catch((error) => {
        dispatch({
          type: ADD_MOVIE_UPLOAD_FAIL,
          payload: error.response?.data ? error.response.data : error.message,
        });
      });
  };
};

export const updateMovieUpload = (phimObj) => {
  return (dispatch) => {
    dispatch({
      type: POST_UPDATE_MOVIE_REQUEST,
    });
    moviesApi
      .capNhatPhimUpload(phimObj)
      .then((result) => {
        dispatch({
          type: POST_UPDATE_MOVIE_SUCCESS,
          payload: result.data.content,
        });
      })
      .catch((error) => {
        dispatch({
          type: POST_UPDATE_MOVIE_FAIL,
          payload: {
            error: error.response?.data ? error.response.data : error.message,
          },
        });
      });
  };
};

export const deleteMovie = (maPhim) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_MOVIE_REQUEST,
    });
    moviesApi
      .deleteMovie(maPhim)
      .then((result) => {
        dispatch({
          type: DELETE_MOVIE_SUCCESS,
          payload: result.data.content,
        });
        dispatch(getMovieListManagement());
      })
      .catch((error) => {
        const message = error?.response?.data
          ? error.response.data
          : "Xóa thành công nhưng backend return error";
        dispatch({
          type: DELETE_MOVIE_FAIL,
          payload: { error: message },
        });
      });
  };
};

export const resetMoviesManagement = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_MOVIE_MANAGEMENT,
    });
  };
};
