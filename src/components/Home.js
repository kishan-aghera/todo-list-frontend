import React, { Component } from "react";
import axios from "axios";
import { 
  Button, 
  Card, 
  CardTitle, 
  Row, 
  Col, 
  Container 
} from 'reactstrap';

import Registration from "./auth/Registration";
import Login from "./auth/Login";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data); // [App.js 63]
    this.props.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout(); // [App.js 72]
      })
      .catch(error => {
        console.log("Logout Error", error);
      });
  }

  render() {
    return (
      <div>
        {
          (this.props.loggedInStatus === "LOGGED_IN") ?
            (
              <Button color="danger" onClick={() => this.handleLogoutClick()}>Logout</Button>
            ) :
            (
              <Container>
                <Row xs="5">
                  <Col sm="6">
                    <Card>
                      <CardTitle tag="h5">Registration</CardTitle>
                      <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card>
                      <CardTitle tag="h5">Login</CardTitle>
                      <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </Card>
                  </Col>
                </Row>
              </Container>
            )
        }
      </div>
    );
  }
}
