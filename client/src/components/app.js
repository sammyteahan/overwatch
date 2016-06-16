import axios from 'axios';
import React from 'react';
import moment from 'moment';
import { Component } from 'react';
import MovementChart from './movementChart';

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
    return axios.get('/statuses').then((response) => {
      this.setState({
        statuses: response.data
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('will receive props');
  }
  render() {
    let timecards = this.state.statuses.map((item, i) => {
      let now = moment(item.created)
        .format('dddd, MMMM Do YYYY, h:mm:ss a');
      return (
        <div className="card" key={i}>
          <p>{now}</p>
        </div>
      );
    });
    return (
      <div className="content">
        <header className="highlight pad--ends push--bottom">
          <h1>Overwatch</h1>
        </header>
        <div className="dashboard squeeze">
          <div className="card-container">
          <h2>Recent</h2>
          {timecards}
          </div>
          <div className="chart-container">
            <MovementChart />
          </div>
        </div>
      </div>
    );
  }
}
