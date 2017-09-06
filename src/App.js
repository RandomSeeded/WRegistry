import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { createStore } from 'redux';
import logo from './logo.svg';
import './App.css';
import * as _ from 'lodash';

window.id = 1;

function changeItems(state = [{text:'hi', key: 0}], action) {
  switch (action.type) {
  case 'ADD':
    return state.concat([{key: window.id++, text: action.item.text}]);
  case 'REMOVE':
    console.log('here');
    console.log('action', action);
    console.log('state', state);
    return _.reject(state, item => action.key === item.key);
  default:
    return state;
  }
}

let store = createStore(changeItems);

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
        <Button>Add Item</Button>
      </form>
    );
  }
}

class ItemText extends Component {
  render() {
    return (
      <span>{this.props.item.text}</span>
    );
  }
}

class ItemEditButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  delete() {
    this.props.removeItem({ key: this.props.item.key });
    this.setState({ showModal: false });
  }

  save() {
    // TODO (nw): this
    // this.props.saveItem({ key: this.props.item.key });
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    console.log('this', this);
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
              controlId="Update Description"
            >
            <FormControl
              type="text"
              value={this.props.item.text}
            />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.delete.bind(this)}>Delete</Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
            <Button onClick={this.save.bind(this)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
}

class ItemContainer extends Component {
  render() {
    return (
      <div>
        <ItemEditButton item={this.props.item} removeItem={this.props.removeItem}/>
        <ItemText item={this.props.item}/>
      </div>
    );
  }
}

class ItemList extends Component {
  render() {
    const items = this.props.items.map(item => {
      return (<ItemContainer item={item} key={item.id} removeItem={this.props.removeItem}/>);
    });
    return (
      <div>
        {items}
      </div>
    );
  }
}

class EmailForm extends Component {
  // TODO (nw): this needs to do things
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
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
          bsSize="small"
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
        bsSize="small"
        onClick={this.create.bind(this)}
        href="/registry"
      >
        Create a New Registry!
      </Button>
    );
  }
}

class Registry extends Component {
  render() {
    const state = store.getState();
    return (
      <div>
        <ItemList items={state} removeItem={this.props.removeItem} />
        <ItemForm addItem={this.props.addItem} />
        <div>
          <EmailForm />
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
  }

  addItem(val) {
    const item = { text: val, id: window.id++ };
    store.dispatch({ type: 'ADD', item });
    const state = store.getState();
    this.setState({ data: state });
  }

  removeItem(val) {
    store.dispatch({ type: 'REMOVE', key: 0 });
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Wedding Registry</h2>
        </div>
        <div>
          <NewRegistryButton />
          <LoginModal />
        </div>
        <Switch>
          <Route path='/registry' render={()=><Registry addItem={this.addItem.bind(this)} removeItem={this.removeItem.bind(this)}/>} />
        </Switch>
      </div>
    );
  }
}

export default App;
