import axios from 'axios';
import React from 'react';
import moment from 'moment';
import { Component } from 'react';
import MovementChart from './movementChart';
import { fetchAnalytics, fetchWeeklyHistory } from '../utils/helpers';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io.connect(),
      statuses: [],
      weeklyHistory: []
    };
  }
  componentWillMount() {
    const socket = this.state.socket;
    socket.on('status change', (data) => {
      this.setState({statuses: [data.new_val].concat(this.state.statuses)});
      return fetchWeeklyHistory().then((response) => {
        this.setState({
          weeklyHistory: response.data
        });
      });
    });
  }
  componentDidMount() {
    return fetchAnalytics().then((response) => {
      this.setState({
        statuses: response.statuses,
        weeklyHistory: response.weeklyHistory
      });
    });
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
          <h1 className="spacing">OVERWATCH</h1>
        </header>
        <div className="dashboard squeeze">
          <div className="wrap-cards">
            <h3 className="[ title spacing-sm ]">RECENT ACTIVITY</h3>
            <div className="card-container">
              {timecards}
            </div>
          </div>
          <div className="chart-container">
            <h3 className="[ title spacing-sm ] [ push-half--bottom pad-half--left ]">WEEKLY ACTIVITY</h3>
            <MovementChart lineData={this.state.weeklyHistory} />
          </div>
        </div>
      </div>
    );
  }
}
