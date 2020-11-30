import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { getUser } from "./actions/user";
import { register } from "./actions/auth";
import { createPosition } from "./actions/positions";

import Navbar from "./components/navbar/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Positions from "./components/input/Positions";

import Alert from "./components/layout/Alert";

import "./App.css";
import { login, logout } from "./actions/auth";

const App = () => {
  const [user, setUser] = useState({});

  const [logedin, setLogedin] = useState(false);

  const [alert, setAlert] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  const signin = async (email, password) => {
    const returnValue = await login(email, password);
    if (returnValue instanceof Error) {
      setAlert({
        message: returnValue.response.data.errors.msg,
        type: "danger",
      });
      setTimeout(() => setAlert({}), 5000);
    } else {
      setLogedin(true);
      setUser(await loadUser());
    }
  };

  const signout = () => {
    logout();
    setUser({});
    setLogedin(false);
  };

  const signup = async (email, password, password2) => {
    if (password !== password2) {
      setAlert({ message: "Passwords do not match", type: "danger" });
    } else {
      const returnValue = await register({ email, password });
      if (returnValue instanceof Error) {
        setAlert({
          message: returnValue.response.data.errors.msg,
          type: "danger",
        });
        setTimeout(() => setAlert({}), 5000);
      } else {
        setLogedin(true);
        setUser(await loadUser());
      }
    }
  };

  const makePosition = async (formData) => {
    const returnValue = await createPosition(formData);
    if (returnValue instanceof Error) {
      setAlert({
        message: returnValue.response.data.errors.msg,
        type: "danger",
      });
      setTimeout(() => setAlert({}), 5000);
    } else {
      setAlert({
        message: "Position added",
        type: "success",
      });
      setTimeout(() => setAlert({}), 5000);
    }
  };

  const loadUser = async () => {
    if (localStorage.crypto_token) {
      const returnValue = await getUser();
      if (returnValue instanceof Error) {
        setAlert({
          message: returnValue.response.data.errors.msg,
          type: "danger",
        });
        setTimeout(() => setAlert({}), 5000);
      } else {
        setUser(returnValue);
        setLogedin(true);
        console.log(returnValue);
      }
    }
  };

  return (
    <Router>
      <Fragment>
        <Navbar signout={signout} logedin={logedin} />
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/" render={() => <Landing user={user} />} />
          <Route
            exact
            path="/login"
            render={() => <Login signin={signin} logedin={logedin} />}
          />
          <Route
            exact
            path="/register"
            render={() => <Register signup={signup} logedin={logedin} />}
          />
          {logedin && (
            <Route
              exact
              path="/positions"
              render={() => (
                <Positions makePosition={makePosition} loadUser={loadUser} />
              )}
            />
          )}
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
