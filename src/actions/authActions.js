import * as ActionTypes from 'constants/actionTypes';
import { createServiceAction, dispatchAction } from 'actions/serviceActionUtil';
import AuthService from 'services/authService';

export const signIn = (payload) => {
  return createServiceAction(
    ActionTypes.SIGN_IN, 
    AuthService.signIn, 
    payload,
    {
      error: true, error_msg: 'Invalid email or password',
      success: true, success_msg: 'Successfully signed-in',
    }
  );
};

export const verifyToken = (reload) => {
  if (reload) {
    dispatchAction(ActionTypes.APP_LOADING, {})
  }
  if (!AuthService.getToken()) {
    return dispatchAction(ActionTypes.VERIFY_TOKEN_ERROR, {})
  }
  return createServiceAction(ActionTypes.VERIFY_TOKEN, AuthService.verifyToken, reload);
}
export const signOut = () => {
  return dispatchAction(ActionTypes.SIGN_OUT, {})
}