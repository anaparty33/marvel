import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import {connect} from  'react-redux';
import FullWidthLayout from "components/layouts/fullWidthLayout";
import HeaderLayout from "components/layouts/headerLayout";

function RouteWrapper (props) {
  let Component = props.component, {
    component,
    isPrivate,
    isSignedIn,
    layout,
    ...rest
  } = props;
    /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate && !isSignedIn) {
    return <Redirect to="/signin" />;
  }

  /**
   * Redirect user to Main page if he tries to access a non private route like
   * (SignIn or SignUp) after being authenticated.
   */
  if (!isPrivate && isSignedIn) {
    return <Redirect to="/dashboard" />;
  } 
  
  let Layout = !!layout ? layout : HeaderLayout;
  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
  return (
    <Route {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  user: PropTypes.object
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  isSignedIn: false,
  user: {},
};

const mapStateToProps = (state) => {
  return {
      isSignedIn: state.authdata.isSignedIn,
      user: state.authdata.user
  }
}

export default connect(mapStateToProps)(RouteWrapper);
