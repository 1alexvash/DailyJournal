import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components

import HomePage from "./components/HomePage/HomePage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Settings from "./components/Settings/Settings";
import UserPage from "./components/UserPage/UserPage";
import History from "./components/History/History";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./scss/main.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/user-page" component={UserPage} />
        <PrivateRoute exact path="/history" component={History} />
      </Router>
    </Provider>
  );
};

export default App;
