import React from 'react';
import './reduxFormFields.scss';

export const renderTextField = ({
    label,
    id,
    input,
    meta: { touched, invalid, error },
    ...custom
}) => (
    <React.Fragment>
        <label 
        htmlFor={id}
        >
           {label} 
        </label>
        <input 
        type="text" 
        autoComplete="off"  
        id={id}
        {...input}
        {...custom}
        className={`form-control ${!!custom.className && custom.className}`}
        />
    </React.Fragment>
)