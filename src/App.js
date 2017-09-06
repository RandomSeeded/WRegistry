import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class ItemForm extends Component {
  handleSubmit(e) {
    this.props.addItem(this.input.value);
    this.input.value = '';
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} method="post">
        <input name="name" placeholder="Description" ref={node => {
          this.input = node;
        }}/>
        <button>Add Item</button>
      </form>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <li>{this.props.item.text}</li>
    );
  }
}

class ItemList extends Component {
  render() {
    const items = this.props.items.map(item => {
      return (<Item item={item} key={item.id}/>);
    });
    return (
      <ul>{items}</ul>
    );
  }
}

class EmailForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    // TODO (nw): need to have modal for inviting all your guests
    return (
      <form onSubmit={this.handleSubmit.bind(this)} method="post">
        <input name="name" placeholder="Description" ref={node => {
          this.input = node;
        }}/>
        <button>Invite guest to view your registry!</button>
      </form>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  // not currently in use
  getValidationState() {
    const length = this.state.username.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="Username"
          />
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Password"
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>
    );
  }
}

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="medium"
          onClick={this.open.bind(this)}
        >
          Edit Existing Registry
        </Button>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
	  <Modal.Body>
            <h4>Overflowing text to show scroll behavior</h4>
            <LoginForm />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class NewRegistryButton extends Component {
  create() {
    alert('Stuff goes here');
  }

  render() {
    return (
      <Button
        bsStyle="primary"
        bsSize="medium"
        onClick={this.create.bind(this)}
      >
        Create a New Registry!
      </Button>
    );
  }
}

window.id = 0;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.addItem = this.addItem.bind(this);
  }

  addItem(val) {
    const item = { text: val, id: window.id++ };
    this.state.data.push(item);
    this.setState({ data: this.state.data });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <NewRegistryButton />
          <LoginModal />
        </div>
        <div>
          <ItemList items={this.state.data} />
          <ItemForm addItem={this.addItem} />
        </div>
        <div>
          <EmailForm />
        </div>
      </div>
    );
  }
}

export default App;
