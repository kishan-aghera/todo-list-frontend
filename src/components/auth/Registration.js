import React, { useState } from 'react';
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";

const Registration = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const emailHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  }

  const passwordConfirmationHandler = (event) => {
    setPasswordConfirmation(event.target.value);
  }

  const handleSubmit = (event) => {
    axios
      .post(
        // "https://todo-list-rails-api.herokuapp.com/registrations",
        "http://localhost:3001/registrations",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
          }
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          props.handleSuccessfulAuth(response.data); // [Home.js 23]
        }
      })
      .catch((error) => {
        console.log("Registration Error: ", error);
      });

    event.preventDefault();
  }


  return (
    <div>
      <Form onSubmit={handleSubmit}>
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

        <FormGroup>
          <Input
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={passwordConfirmation}
            onChange={passwordConfirmationHandler}
            required
          />
        </FormGroup>

        <Button color="primary" type="submit">Register</Button>
      </Form>
    </div>
  )
}

export default Registration;
