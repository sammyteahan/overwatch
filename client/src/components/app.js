import axios from 'axios';
import React from 'react';
import { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statuses: []
    };
  }
  componentDidMount() {
    return axios.get('http://localhost:3000/statuses').then((response) => {
      console.log(response.data);
      this.setState({
        statuses: response.data
      });
    });
  }
  render() {
    let items = this.state.statuses.map((item, i) => {
      return (
        <li key={i}>{item.created}, {item.state.state}</li>
      );
    });
    return (
      <div className="squeeze">
        <header>
          <h1>Overwatch</h1>
        </header>
        <div>
          <p>items</p>
          <ul>
            {items}
          </ul>
        </div>
      </div>
    );
  }
}

