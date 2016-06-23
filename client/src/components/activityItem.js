import React from 'react';


/**
 * @name ActivityItem
 */
const activityItem = ({ now }) => {
  return (
    <div className="card">
      <p>{now}</p>
    </div>
  );
}

export default activityItem;
