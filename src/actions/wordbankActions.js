import * as ActionTypes from 'constants/actionTypes';
import { createServiceAction, dispatchAction } from 'actions/serviceActionUtil';
import WordbankService from 'services/wordbankService';

export const signIn = (payload) => {
  return createServiceAction(
    ActionTypes.VOLUMES, 
    WordbankService.getVolumes
  );
};