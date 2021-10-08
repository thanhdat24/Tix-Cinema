import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Register from "./templates/HomeTemplate/Layout/Register/Register";
import Detail from "./pages/Detail/Detail";
import Profile from "./pages/Profile/Profile";

import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import React, { Suspense, lazy } from "react";
import Login from "./pages/Login/Login";
import Loading from "./components/Loading/Loading";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Checkout from "./pages/BookingTicket/Checkout/Checkout";
export const history = createBrowserHistory();

const CheckoutTemplateLazy = lazy(() =>
  import("./templates/CheckoutTemplate/CheckoutTemplate")
);

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <Route path="/profile" exact component={Profile} />

        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <HomeTemplate path="/home" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
