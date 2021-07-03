import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data); // [Home.js 23]
        }
        else {
          alert("User does not exist. Please Register first.");
        }
      })
      .catch((error) => {
        console.log("Login Error: ", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </FormGroup>

          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}
