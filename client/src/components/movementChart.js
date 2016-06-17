import React, { Component } from 'react';
import Chart from 'chart.js';


/**
* @name Chart
*/
class MovementChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ctx: null,
      chart: null,
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: "Monthly Activity",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#1abc9c",
            borderColor: "#47a3da",
            borderCapStyle: 'butt',
            borderDash: [],
            borderWidth: 4,
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#47a3da",
            pointHoverBorderColor: "#1abc9c",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        showGridLines: true,
        maintainAspectRatio: true
      }
    };
  }
  componentDidMount() {
    this.setState({
      ctx: this.refs.chart.getContext('2d'),
    });
  }
  /**
  * @todo figure out how to setState on these nested fields.
  * maybe consider react-sparklines if there isn't a better way
  *
  * this.state.chart.data.datasets[0].data = this.props.lineData;
  * this.state.chart.update();
  */
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.chart) {
      this.setState({
        chart: new Chart(this.state.ctx, {
          type: 'line',
          data: this.state.data,
          options: this.state.options
        })
      });
    }
    if (this.props.lineData !== prevProps.lineData) {
      this.setState({
        chart: new Chart(this.state.ctx, {
          type: 'line',
          data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
              label: "Weekly Activity",
              backgroundColor: "#47a3da",
              borderWidth: 4,
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#47a3da",
              pointHoverBorderColor: "#1abc9c",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              data: this.props.lineData
            }]
          },
          options: this.state.options
        })
      })
    }
  }
  render() {
    return (
      <div style={{width: 600}}>
        <canvas ref="chart"></canvas>
      </div>
    );
  }
}

export default MovementChart;
