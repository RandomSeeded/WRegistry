import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { createStore } from 'redux';
import './App.css';
import * as _ from 'lodash';

window.id = 1;

function changeItems(state = [{text:'hi2u', key: 0}], action) {
  switch (action.type) {
  case 'ADD':
    return state.concat([{key: window.id++, text: action.item.text}]);
  case 'REMOVE':
    return _.reject(state, item => action.key === item.key);
  case 'UPDATE':
    const newState = _.map(state, item => {
      if (action.key === item.key) {
        // TODO (nw): this should probably be an extends
        return action;
      }

      return item;
    });
    return newState;
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
        <Button type="submit">Add Item</Button>
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
    const state = store.getState();
    const initialText = _.find(state, item => item.key === this.props.item.key).text;
    this.state = {
      showModal: false,
      text: initialText
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
    this.props.updateItem({ key: this.props.item.key, text: this.state.text });
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  
  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
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
}

class ItemContainer extends Component {
  render() {
    return (
      <div>
        <ItemEditButton
          item={this.props.item}
          removeItem={this.props.removeItem}
          updateItem={this.props.updateItem}
        />
        <ItemText item={this.props.item}/>
      </div>
    );
  }
}

class ItemList extends Component {
  render() {
    const items = this.props.items.map(item => {
      return (
        <ItemContainer
          item={item}
          key={item.id}
          removeItem={this.props.removeItem}
          updateItem={this.props.updateItem}
        />
      );
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
        <ItemList 
          items={state}
          removeItem={this.props.removeItem}
          updateItem={this.props.updateItem}
        />
        <ItemForm addItem={this.props.addItem} />
        <div>
          <EmailForm />
        </div>
      </div>
    );
  }
}

class FrontPageModal extends Component {
  render() {
    return (
      <div>
        <NewRegistryButton />
        <LoginModal />
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
    // There's got to be a better way of triggering update
    this.forceUpdate();
  }

  removeItem(val) {
    store.dispatch({ type: 'REMOVE', key: val.key });
    this.forceUpdate();
  }

  updateItem({ key, text }) {
    store.dispatch({ type: 'UPDATE', key, text });
    this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Wedding Registry</h2>
        </div>
        <Switch>
          <Route exact path='/' component={FrontPageModal} />
          <Route path='/registry' render={()=>
            <Registry
              addItem={this.addItem.bind(this)}
              removeItem={this.removeItem.bind(this)}
              updateItem={this.updateItem.bind(this)}
            />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
