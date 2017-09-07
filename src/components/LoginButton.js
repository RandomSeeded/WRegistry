import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import LoginForm from './LoginForm';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  open() {
    this.setState({ showModal: true });
  }

  cancel() {
    this.setState({ showModal: false });
  }

  login() {
    // This has to do some complex logic...right?
    // What does it need to do? 
    // 1) issue AJAX request
    // 2) if successful, go to another page
    // 3) if failed, display that
    // TODO (nw): figure out how to make this work with redux. What is the stored state, if anything? What would our container components be?
    // Possibly we want container components that don't have reducers / actions?
    // Our state would probably be whether we're logged in / who we're logged in as
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open.bind(this)}
        >
          Login To Existing Registry
        </Button>
        <Modal show={this.state.showModal} onHide={this.cancel.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
	  <Modal.Body>
            <LoginForm />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.cancel.bind(this)}>Cancel</Button>
            <Button onClick={this.login.bind(this)}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default LoginButton;
