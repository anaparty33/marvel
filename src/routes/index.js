import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Switch, Router } from "react-router-dom";
import { toast } from 'react-toastify';
import { Route, Redirect } from "react-router-dom";
import history from 'services/history';

import Start from "views/start/Start";
import Questions from "views/questions/Questions";
import Heros from "views/heros/Heros";


function Routes(props) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Start}  />
        <Route path="/questions" exact component={Questions}/>
        <Route path="/Heros" exact component={Heros} />
        <Route path='*' exact={true} component={Start}/>
      </Switch>
    </Router>
  );
}

export default Routes;


