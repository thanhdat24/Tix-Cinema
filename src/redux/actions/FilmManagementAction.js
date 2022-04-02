import { filmManagementService } from "../../services/FilmManagementService";
import { SET_CAROUSEL } from "./types/CarouselType";
import { SET_LIST_FILM } from "./types/FilmManagementType";
import {
  ADD_MOVIE_UPLOAD_SUCCESS,
  GET_MOVIE_LIST_SUCCESS,
  POST_UPDATE_MOVIE_SUCCESS,
  POST_UPDATE_MOVIE_REQUEST,
  RESET_MOVIE_MANAGEMENT,
  GET_MOVIE_LIST_REQUEST,
  ADD_MOVIE_UPLOAD_REQUEST,
  DELETE_MOVIE_REQUEST,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAIL,
  SAVE_BEFOREINSTALLPROMPT_EVENT,
} from "../actions/types/MovieType";

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
  return async (dispatch) => {
    dispatch({
      type: GET_MOVIE_LIST_REQUEST,
    });
    try {
      const result = await filmManagementService.getDanhSachPhim();
      dispatch({
        type: GET_MOVIE_LIST_SUCCESS,
        payload: result.data.content,
      });
    } catch (error) {
      console.log("error", error);
      console.log("error.response.data.content", error.response.data.content);
    }
  };
};

export const themPhimUploadHinhAction = (movieObj) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_MOVIE_UPLOAD_REQUEST,
    });
    try {
      const result = await filmManagementService.themPhimUploadHinh(movieObj);
      dispatch({
        type: ADD_MOVIE_UPLOAD_SUCCESS,
        payload: result.data.content,
      });
    } catch (error) {
      console.log("error", error);
      console.log("error.response.data.content", error.response.data.content);
    }
  };
};

export const updateMovieUpload = (phimObj) => {
  return async (dispatch) => {
    dispatch({
      type: POST_UPDATE_MOVIE_REQUEST,
    });
    try {
      const result = await filmManagementService.capNhatPhimUpload(phimObj);
      dispatch({
        type: POST_UPDATE_MOVIE_SUCCESS,
        payload: result.data.content,
      });
    } catch (error) {
      console.log("error", error);
      console.log("error.response.data.content", error.response.data.content);
    }
  };
};

export const deleteMovie = (maPhim) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_MOVIE_REQUEST,
    });
    try {
      const result = await filmManagementService.deleteMovie(maPhim);
      dispatch({
        type: DELETE_MOVIE_SUCCESS,
        payload: result.data.content,
      });
      dispatch(getMovieListManagement());
    } catch (error) {
      const message = error?.response?.data
        ? error.response.data
        : "Xóa thành công nhưng backend return error";
      dispatch({
        type: DELETE_MOVIE_FAIL,
        payload: { error: message },
      });
    }
  };
};
export const resetMoviesManagement = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_MOVIE_MANAGEMENT,
    });
  };
};

export const saveBeforeinstallpromptEvent = (event) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_BEFOREINSTALLPROMPT_EVENT,
      payload: { event },
    });
  };
};
