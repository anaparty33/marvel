import React from "react";
import PropTypes from "prop-types";
import {
  Container
} from 'react-bootstrap';

import Header from  'header/Header';
import './headerLayout.scss';

export default function HeaderLayout({ children }) {
  return (
    <Container className="main" fluid>
      <Header />
      {children}
    </Container>
    
  );
}

HeaderLayout.propTypes = {
  children: PropTypes.element.isRequired
};
