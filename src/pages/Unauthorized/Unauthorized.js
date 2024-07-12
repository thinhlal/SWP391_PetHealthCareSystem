import React from 'react';
import './Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1>401</h1>
      <p>You are not authorized for selected action</p>
      <a href="/login">Go to login page</a>
    </div>
  );
}

export default Unauthorized;
