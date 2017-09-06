import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ItemForm extends Component {
  handleSubmit(e) {
    this.props.addItem(this.input.value);
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
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ItemForm addItem={this.addItem} />
        <ItemList items={this.state.data} />
      </div>
    );
  }
}

export default App;
