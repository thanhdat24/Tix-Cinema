import { filmManagementService } from "../../services/FilmManagementService";
import { SET_CAROUSEL } from "./types/CarouselType";
import {SET_LIST_FILM} from "./types/FilmManagementType";
export const getFilmManagementAction = () => {
  return async (dispatch) => {
    try {
      const result = await filmManagementService.layDanhSachPhim();
      // Đưa lên reducer
      // console.log("result", result);x

      dispatch({
        type: SET_LIST_FILM,
        arrFilm: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
