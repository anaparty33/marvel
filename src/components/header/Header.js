import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import marvel from '../../assets/images/marvel_logo.png';
import './header.scss';



function Header() {
  return(
    <header position="static" className="header-container">
      <Link to="/"><img src={marvel} /></Link>
    </header>
  )
}

export default Header