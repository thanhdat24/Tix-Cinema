import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./templates/HomeTemplate/Layout/Login/Login";
import Register from "./templates/HomeTemplate/Layout/Register/Register";
import Detail from "./pages/Detail/Detail";

export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />

        <Route path="/login" exact Component={Login} />
        <Route path="/register" exact Component={Register} />
        <HomeTemplate path="/home" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
