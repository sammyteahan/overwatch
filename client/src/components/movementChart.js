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
      tmpData: {
            labels: ['Item 1', 'Item 2', 'Item 3'],
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: 'rgba(26, 188, 156,1.0)'
            }]
        },
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40],
            }
        ]
      },
      options: {
        responsive: true,
        showGridLines: true
      }
    };
  }
  componentDidMount() {
    this.setState({
      ctx: this.refs.chart.getContext('2d'),
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if(!this.state.chart) {
      this.setState({
        chart: new Chart(this.state.ctx, {
          type: 'line',
          data: this.state.data,
          options: this.state.options
        })
      });
    }
  }
  render() {
    return (
      <div style={{maxWidth: 600}}>
        <canvas ref="chart" width="600" height="350"></canvas>
      </div>
    );
  }
}

export default MovementChart;
