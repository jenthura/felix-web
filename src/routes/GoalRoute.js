import React from 'react';
import Goal from '../components/Goal/Goal';

const GoalRoute = (props) => {
  console.log('Hello')
  return (
    <>
      <Goal 
        {...props}
      />
    </>
  )
}

export default GoalRoute;