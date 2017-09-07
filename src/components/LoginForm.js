import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const LoginForm = () => (
  <form>
    <FormGroup
      controlId="LoginForm"
    >
      <FormControl
        type="text"
        placeholder="Username"
      />
      <FormControl
        type="password"
        placeholder="Password"
      />
      <FormControl.Feedback />
    </FormGroup>
  </form>
);

export default LoginForm;
