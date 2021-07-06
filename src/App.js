import React, { Component } from "react";
import { 
  BrowserRouter, 
  Switch, 
  Route 
} from "react-router-dom";
import axios from "axios";

import "./App.css";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import TaskItem from './components/Tasks/TaskItem'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      isLoggedIn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  checkLoginStatus() {
    axios
      .get("https://todo-list-rails-api.herokuapp.com/logged_in", { withCredentials: true })
      .then((response) => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user,
            isLoggedIn: true
          });
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
            isLoggedIn: false
          });
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
      isLoggedIn: true
    });
  }


  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      isLoggedIn: false
    });
  }


  render() {
    return (
      <div className="App">
        <NavBar isLoggedIn={this.state.isLoggedIn} />     
        <br />
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/todo-list-frontend"}
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/todo-list-frontend/dashboard"}
              render={props => (
                <TaskItem
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogout={this.handleLogout}
                  user_id={this.state.user.id}
                  isLoggedIn={this.state.isLoggedIn}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
