import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';

import Home from './components/Home';
import TaskItem from './components/Tasks/TaskItem';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    });
  }

  render() {
    return (
      <div className="App">
        <h1>In App</h1>

        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
            <Route
              exact
              path={"/tasks"}
              render={props => (
                <TaskItem {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
