import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import  FilmManagementReducer  from "./reducers/FilmManagementReducer";
import { CinemaManagementReducer } from "./reducers/CinemaManagementReducer";
import { UserManagementReducer } from "./reducers/UserManagementReducer";
import { BookingTicketManagementReducer } from "./reducers/BookingTicketManagementReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import lazyReducer from "./reducers/Lazy";
const rootReducer = combineReducers({
  // state ứng dụng
  CarouselReducer,
  FilmManagementReducer,
  CinemaManagementReducer,
  UserManagementReducer,
  BookingTicketManagementReducer,
  LoadingReducer,
  lazyReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
