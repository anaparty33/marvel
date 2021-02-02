import * as ActionTypes from 'constants/actionTypes';

import {dispatchAction} from 'actions/serviceActionUtil';

export const updateHero = (hero) => {
    return dispatchAction(ActionTypes.UPDATE_HERO, {hero})
}