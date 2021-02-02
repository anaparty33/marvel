import InitialState from 'reducers/initialState';
import * as ActionTypes from 'constants/actionTypes';

export default (state = InitialState.AppState.questiondata, action) => {
  switch (action.type) {
    case ActionTypes.APP_LOADING: {
      return AppLoadStatus(state, true);
    }
    case ActionTypes.VERIFY_TOKEN_ERROR:
    case ActionTypes.VERIFY_TOKEN_SUCCESS: {
      return AppLoadStatus(state, false, action.payload);
    }
    case ActionTypes.NOTI_RESET:
    case ActionTypes.NOTI_LOADING:
    case ActionTypes.NOTI_WARNING:
    case ActionTypes.NOTI_ERROR:
    case ActionTypes.NOTI_SUCCESS: {
      return SetNotiStatus(state, action.payload);
    }
    default:
      return state;
  }
}

const AppLoadStatus = (state, app_loading, payload) => {
  let {volume} = state;
  if(!!payload && !!payload.volume) {
    volume = payload.volume;
  }
  return { ...state, app_loading, volume };
}

const SetNotiStatus = (state, payload) => {
  return { ...state, ...payload }
}
