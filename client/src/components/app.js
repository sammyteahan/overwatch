import axios from 'axios';
import React, { Component } from 'react';
import moment from 'moment';
import Header from './header';
import MovementChart from './movementChart';
import { fetchAnalytics, fetchWeeklyHistory } from '../utils/helpers';


/**
* @name App
*/
export default class App extends Component {
  // @todo add loading indicators
  constructor(props) {
    super(props);
    this.state = {
      socket: io.connect(),
      statuses: [],
      weeklyHistory: []
    };
  }

  // @todo this should be moved to componentWillReceiveProps
  componentWillMount() {
    const { socket } = this.state;
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
      const { statuses, weeklyHistory } = response;
      this.setState({ statuses, weeklyHistory });
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
        <Header title="Overwatch" />
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
