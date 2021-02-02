import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Header from  'header/Header';
import startbg from '../../../assets/images/start.jpg';
import './start.scss';

function Start() {
  return (
    <div className="container start-container">
      <div className="row">
        <img src={startbg} className="start-bg"/>
        <Link to="/questions/" className="start-btn">
            <button type="button" className="btn btn-danger btn-lg">Start</button>
        </Link>
      </div>
    </div>
  )
}

export default Start;