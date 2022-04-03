import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
// import Register from "./templates/HomeTemplate/Layout/Register/Register";
import MovieDetail from "./pages/MovieDetail/index";

import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import React, { Suspense, lazy } from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Loading from "./components/Loading/Loading";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import BookTickets from "./pages/BookingTicket";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import MoviesManagement from "./pages/MoviesManagement/MoviesManagement";
import CreateShowtime from "./pages/CreateShowtime/CreateShowtime";
import UsersManagement from "./pages/UsersManagement/UsersManagement";
import UserProfile from "./pages/UserProfile/UserProfile";

export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:maPhim" exact Component={MovieDetail} />
        <HomeTemplate path="/profile" exact Component={UserProfile} />

        <Route
          exact
          path={["/admin/movies", "/admin/users", "/admin/showtimes"]}
        >
          <AdminLayout>
            <AdminTemplate
              exact
              path="/admin/movies"
              component={MoviesManagement}
            />
            <AdminTemplate
              exact
              path="/admin/users"
              component={UsersManagement}
            />
            <AdminTemplate
              exact
              path="/admin/showtimes"
              component={CreateShowtime}
            />
          </AdminLayout>
        </Route>
        <CheckoutTemplate
          path="/checkout/:maLichChieu"
          exact
          Component={BookTickets}
        />
        <Route exact path={["/login", "/register"]}>
          <AuthLayout>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </AuthLayout>
        </Route>
        <HomeTemplate path="/home" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
