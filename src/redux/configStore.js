import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { FilmManagementReducer } from "./reducers/FilmManagementReducer";
const rootReducer = combineReducers({
  // state ứng dụng
  CarouselReducer,
  FilmManagementReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
