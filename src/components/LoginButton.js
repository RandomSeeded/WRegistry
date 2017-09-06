import React, { Component } from 'react';
import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap';

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

  close() {
    this.setState({ showModal: false });
  }

  delete() {
    this.setState({ showModal: false });
  }

  save() {
    this.setState({ showModal: false });
  }

  handleChange() {
    console.log('handleChange');
  }

  render() {
    return (
      <span>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open.bind(this)}
        >
          Edit
        </Button>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup
              controlId="formBasicText"
            >
              <FormControl
                type="text"
                value={this.state.text}
                placeholder="Description of your item"
                onChange={this.handleChange.bind(this)}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.delete.bind(this)}>Delete</Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
            <Button onClick={this.save.bind(this)} type="submit">Save</Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
};

export default LoginButton;
