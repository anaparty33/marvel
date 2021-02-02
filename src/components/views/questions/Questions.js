import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {updateHero} from 'actions/questionActions';
import history from 'services/history';
import Header from 'header/Header';
import './questions.scss';
import api from 'services/http';

function Questions() {
  let [hero, setHero] = useState('');
  const dispatch = useDispatch();
  let onSubmit = () => {
    dispatch(updateHero(hero))
    history.push('/heros');
  }
  return (
    <>
      <Header />
      <div className="container questions-container">
        <div className="question-form">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Enter Hero Name</label>
            <input 
            type="text" 
            className="form-control" 
            id="exampleInputEmail1" 
            value={hero}
            onChange={(e) => { setHero(e.target.value) }}
            />
            <div id="emailHelp" className="form-text">You can enter starts with as well.</div>
          </div>
          <button 
          className="btn btn-danger"
          onClick={onSubmit}
          >Submit</button>
        </div>
      </div>
    </>
  )
}

export default Questions;