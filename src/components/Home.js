import React, { Component } from 'react'
import Registration from './auth/Registration';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/tasks");
  }

  render() {
    return (
      <div>
        <h2>In Home</h2>
        <h2>Status: {this.props.loggedInStatus}</h2>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}
