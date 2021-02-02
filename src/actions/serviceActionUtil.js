import * as ActionTypes from 'constants/actionTypes';


const getActionTypes = (type) => {
  return {
    LOADING: type + '_LOADING',
    SUCCESS: type + '_SUCCESS',
    ERROR: type + '_ERROR'
  };
};

const notifyDefaults = {
  error: false,
  success: false,
  loading: false,
  error_msg: 'Error processing data',
  success_msg: 'Successfully processed',
  loading_msg: 'Process loading'
};

export const createServiceAction = (type, serviceMethod, params, notifyOptions, onSuccessCallback) => (dispatch, getState) => {

  let notify = {
    ...notifyDefaults,
    ...notifyOptions
  };
  dispatch({
    type: getActionTypes(type).LOADING,
    params: params
  });
  if (notify.loading) {
    dispatch({
      type: ActionTypes.NOTI_LOADING,
      payload: {
        'type': 'info',
        msg: notify.loading_msg
      }
    });
  }

  serviceMethod.call(this, params).then((response) => {
    dispatch({
      type: getActionTypes(type).SUCCESS,
      payload: response,
      params: params
    });
    if (notify.success) {
      dispatch({
        type: ActionTypes.APP_SUCCESS,
        payload: type
      });
      dispatch({
        type: ActionTypes.NOTI_SUCCESS,
        payload: {
          'type': 'success',
          msg: notify.success_msg
        }
      });
    }
    if (onSuccessCallback) {
      onSuccessCallback(response)
    }

  }).catch(err => {
    /*
     * error = {status, message, code}
     * status = 'WARNING', 'ERROR'
     * code is optional
     *
     */
    if (notify.error) {
      dispatch({
        type: ActionTypes.NOTI_ERROR,
        payload: {
          'type': 'error',
          msg: notify.error_msg
        }
      });
    }

    if (!err.stack) {
      // ignore code errors
      dispatch({
        type: getActionTypes(type).ERROR,
        payload: err,
        params: params
      });
    }
  }).finally(() => {
    dispatch({
      type: ActionTypes.NOTI_RESET,
      payload: {
        type: 'reset',
        msg: ''
      }
    });
  })
};

export const dispatchAction = (type, payload, notifyOptions) => (dispatch, getState) => {
  let notify = {
    ...notifyDefaults,
    ...notifyOptions
  };

  dispatch({
    type,
    payload
  });

  if (notify.success) {
    dispatch({
      type: ActionTypes.APP_SUCCESS,
      payload: type
    });
  }
};