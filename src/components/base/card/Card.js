import React, { useState } from 'react';
import parse from 'html-react-parser'
import Header from 'header/Header';
import './card.scss';

function RenderDescription(props) {
  let {description} = props;
  return description
}
function Card(props) {
  let {info} = props;
  return (
    <div className="card" style={{width: '18rem'}}>
      <img src={`${info.thumbnail.path}.${info.thumbnail.extension}`} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{info.name}</h5>
        <p className="card-text">
          {parse(info.description)} 
        </p>
      </div>
      {/* <ul className="list-group list-group-flush">
        <li className="list-group-item">Cras justo odio</li>
        <li className="list-group-item">Dapibus ac facilisis in</li>
        <li className="list-group-item">Vestibulum at eros</li>
      </ul> */}
      <div className="card-body">
        {info.urls.map(url=> <a href={url.url} target="_blank" className="card-link">{url.type}</a>)}
      </div>
    </div>
  )
}

export default Card;