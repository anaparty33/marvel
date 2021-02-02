import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import history from 'services/history';
import Header from 'header/Header';
import Card from 'base/card/Card';
import './Heros.scss';

function Heros(props) {
  //to remove store data on url change
  let hero = useSelector(state => state.questiondata.hero);
  let [heros, setHeros] = useState([]);
  useEffect(() => {
    if(!hero) {
      history.push('/questions/');
    } else {
      axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?hash=1a7873e521d0bfb64a48b064ae7bc438&ts=baradwaj&apikey=86db83f27220d304c82940600d37fd50`,
        {
          params: {
            nameStartsWith: hero
          }
        }
      ).then(({data}) => {
        setHeros(data.data.results)
      })
    }
  }, []);
  return (
    <>
      <Header />
      <div className="container questions-container">
        <div className="row">
          {
            heros.map(hero_detail => <Card info={hero_detail} key={hero_detail.id} />)
          }
        </div>
      </div>
    </>
  )
}

export default Heros;