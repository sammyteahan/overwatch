import React, { Component, PropTypes } from 'react';
import ActivityItem from './activityItem';
import moment from 'moment';


const ActivityItemList = ({ items }) => {
  const timecards = items.map((item, i) => {
    let now = moment(item.created).format('dddd, MMMM Do YYYY, h:mm:ss a');
    return (
      <ActivityItem key={i} now={now} />
    );
  })
  return (
    <div className="card-container">
      {timecards}
    </div>
  );
}

ActivityItemList .propTypes = {
  items: PropTypes.array.isRequired
}

export default ActivityItemList;
