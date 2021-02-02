import React from 'react';

import './stepper.scss';

function Stepper(props) {
  const {view} = props;
  return (
    <div className="stepper-container">
      <div className={`step-holder ${['contest',  'select-words'].includes(view) && 'active'}`}>
        <div className="step-icon">
          <i className="fas fa-globe-americas" />
        </div>
        <div className="step-title">
          Contest
        </div>
      </div>
      {/* <div className={`step-holder ${['contest-group', 'contest', 'select-words'].includes(view) && 'active'}`}>
        <div className="step-icon">
          <i className="fas fa-ball-pile" />
        </div>
        <div className="step-title">
          Contest Group
        </div>
        <div className="stem" />
      </div>
      <div className={`step-holder ${['contest', 'select-words'].includes(view) && 'active'}`}>
        <div className="step-icon">
          <i className="fas fa-users-class" />
        </div>
        <div className="step-title">
          Contest
        </div>
        <div className="stem" />
      </div> */}
     
      <div className={`step-holder ${['select-words'].includes(view) && 'active'}`}>
        <div className="step-icon">
          <i className="fas fa-tasks-alt" />
        </div>
        <div className="step-title">
          Select Words
        </div>
        <div className="stem" />
      </div>
    </div>
  )
}

export default Stepper