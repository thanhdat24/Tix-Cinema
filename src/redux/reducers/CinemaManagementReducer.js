import {
  GET_THEATERS_SHOWTIME_FAIL,
  GET_THEATERS_SHOWTIME_REQUEST,
  GET_THEATERS_SHOWTIME_SUCCESS,
  SET_HE_THONG_RAP_CHIEU,
} from "../actions/types/CinemaManagementType";
const initialState = {
  heThongRapChieu: [],

  loadingTheaterList: false,
  errorTheaterList: null,
  theaterList: [],
};

export const CinemaManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HE_THONG_RAP_CHIEU: {
      return { ...state, heThongRapChieu: action.heThongRapChieu };
    }
    case GET_THEATERS_SHOWTIME_REQUEST: {
      return {
        ...state,
        loadingTheaterList: true,
        errorTheaterList: null,
      };
    }
    case GET_THEATERS_SHOWTIME_SUCCESS: {
      return {
        ...state,
        theaterList: action.payload,
        loadingTheaterList: false,
      };
    }
    case GET_THEATERS_SHOWTIME_FAIL: {
      return {
        ...state,
        errorTheaterList: action.payload.errorTheaterList,
        loadingTheaterList: false,
      };
    }
    default:
      return state;
  }
};
