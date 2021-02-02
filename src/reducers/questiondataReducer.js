import InitialState from 'reducers/initialState';
import * as ActionTypes from 'constants/actionTypes';

export default (state = InitialState.AppState.questiondata, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_HERO: {
      return UpdateHero(state, action.payload.hero);
    }
    default:
      return state;
  }
}

const UpdateHero = (state, hero) => {
  return { ...state, hero };
}


