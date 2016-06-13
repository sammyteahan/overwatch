import axios from 'axios';
import React from 'react';
import { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io.connect(),
      statuses: []
    };
  }
  componentWillMount() {
    const socket = this.state.socket;
    socket.on('status change', (data) => {
      this.setState({statuses: [data.new_val].concat(this.state.statuses)});
    });
  }
  componentDidMount() {
    return axios.get('http://localhost:3000/statuses').then((response) => {
      this.setState({
        statuses: response.data
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('will receive props');
  }
  render() {
    let items = this.state.statuses.map((item, i) => {
      return (
        <li key={i}>{item.created} :: {item.status}</li>
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

