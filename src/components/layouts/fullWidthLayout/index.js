import React from "react";
import PropTypes from "prop-types";
import {
    Container,
    Row
} from 'react-bootstrap';

import './fullWidthLayout.scss';

export default function FullWidthLayout({ children }) {
    return (
        <Container className="main" fluid>
            {children}
        </Container>
    );
}

FullWidthLayout.propTypes = {
    children: PropTypes.element.isRequired
};
