import { SET_HE_THONG_RAP_CHIEU } from "../actions/types/CinemaManagementType";
const initialState = {
  heThongRapChieu: [],
};

export const CinemaManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HE_THONG_RAP_CHIEU: {
      return { ...state, heThongRapChieu: action.heThongRapChieu };
    }
    default:
      return state;
  }
};
