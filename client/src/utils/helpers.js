import axios from 'axios';

/**
* @name Helpers
*/
const fetchStatuses = () => {
  return axios.get('/statuses');
}

export function fetchWeeklyHistory() {
  return axios.get('/history/week');
}

export function fetchAnalytics() {
  return axios.all([fetchStatuses(), fetchWeeklyHistory()])
    .then((arr) => {
      return {
        statuses: arr[0].data,
        weeklyHistory: arr[1].data
      }
    });
}
