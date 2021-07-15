import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import axios from "axios";

import "./App.css";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import TaskItem from './components/Tasks/TaskItem';

const App = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("https://todo-list-rails-api.herokuapp.com/logged_in", { withCredentials: true })
      .then((response) => {
        if (
          response.data.logged_in && !isLoggedIn
        ) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        } else if (
          !response.data.logged_in & isLoggedIn
        ) {
          setIsLoggedIn(false);
          setUser({});
        }
      })
      .catch((error) => {
        console.log("Check Login Error: ", error);
      });
  }, [isLoggedIn]);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
  }


  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} />
      <br />
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={"/todo-list-frontend/dashboard"}
            render={props => (
              <TaskItem
                {...props}
                handleLogout={handleLogout}
                user_id={user.id}
                isLoggedIn={isLoggedIn}
              />
            )}
          />

          <Route
            exact
            path={"/todo-list-frontend"}
            render={props => (
              <Home
                {...props}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
