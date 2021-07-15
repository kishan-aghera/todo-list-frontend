import React, { useState } from 'react';

import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";


const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const submitHandler = (event) => {
    axios
      .post(
        "https://todo-list-rails-api.herokuapp.com/sessions",
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
          props.handleSuccessfulAuth(response.data); // [Home.js 23]
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

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={emailHandler}
            required
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={passwordHandler}
            required
          />
        </FormGroup>

        <Button type="submit">Login</Button>
      </Form>
    </div>
  )
}

export default Login;
