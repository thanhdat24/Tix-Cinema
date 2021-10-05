import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Register from "./templates/HomeTemplate/Layout/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import React, { Suspense, lazy } from "react";
import Login from "./pages/Login/Login";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";
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
        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />
        <HomeTemplate path="/home" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
