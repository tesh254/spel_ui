import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import setAuthToken from "./helpers/setAuthToken";
import Nav from "./components/commons/Nav";
import store from "./redux/store";
import {
  setCurrentUser,
  logoutUser
} from "./redux/actions/auth/setCurrentUser";
import PrivateRouter from "./components/commons/PrivateRouter";

// Components
import Login from "./components/containers/Login";
import SignUp from "./components/containers/Signup";
import VerifyView from "./components/views/Verify";
import EmailVerify from "./components/views/EmailVerify";

if (localStorage.getItem("jwt_token")) {
  // Set auth token header auth
  setAuthToken(localStorage.getItem("jwt_token"));
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.getItem("jwt_token"));
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
            <Nav />
            <ToastContainer autoClose={3000} />
            <div className="App">
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/verify" component={VerifyView} />
                <Route exact path="/email-verify/:token" component={EmailVerify} /> 
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
