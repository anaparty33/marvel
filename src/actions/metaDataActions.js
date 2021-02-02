import * as ActionTypes from 'constants/actionTypes';

import {dispatchAction} from 'actions/serviceActionUtil';

export const loadApp = () => {
    return dispatchAction(ActionTypes.APP_LOADING, {})
}