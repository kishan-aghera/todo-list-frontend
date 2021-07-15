import React from 'react';
import { useHistory } from 'react-router-dom';

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

const Home = (props) => {
  const history = useHistory();

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data); // [App.js 63]
    history.push("/todo-list-frontend/dashboard");
  }

  const handleLogoutClick = () => {
    axios
      .delete("https://todo-list-rails-api.herokuapp.com/logout", { withCredentials: true })
      .then((response) => {
        history.push("/todo-list-frontend");
        props.handleLogout(); // [App.js 72]
      })
      .catch(error => {
        console.log("Logout Error: ", error);
      });
  }


  return (
    <div>
      {
        props.isLoggedIn ?
          (
            <Button color="danger" onClick={() => handleLogoutClick()}>Logout</Button>
          ) :
          (
            <Container>
              <Row xs="5">
                <Col sm="6">
                  <Card>
                    <CardTitle tag="h5">Registration</CardTitle>
                    <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
                  </Card>
                </Col>
                <Col sm="6">
                  <Card>
                    <CardTitle tag="h5">Login</CardTitle>
                    <Login handleSuccessfulAuth={handleSuccessfulAuth} />
                  </Card>
                </Col>
              </Row>
            </Container>
          )
      }
    </div>
  )
}

export default Home;
