import * as ActionTypes from 'constants/actionTypes';

// import {dispatchAction} from 'actions/serviceActionUtil';

// export const loadApp = () => {
//     return dispatchAction(ActionTypes.APP_LOADING, {})
// }


export const wsConnect = host => ({ type: ActionTypes.WS_CONNECT, host });
export const wsConnecting = host => ({ type: ActionTypes.WS_CONNECTING, host });
export const wsConnected = host => ({ type: ActionTypes.WS_CONNECTED, host });

export const wsError = host => ({ type: ActionTypes.WS_ERROR, host });

export const wsDisconnect = host => ({ type: ActionTypes.WS_DISCONNECT, host });
export const wsDisconnecting = host => ({ type: ActionTypes.WS_DISCONNECTING, host });
export const wsDisconnected = host => ({ type: ActionTypes.WS_DISCONNECTED, host });

export const wsMsgToSock = (host, data) => ({ type: ActionTypes.WS_MSG_TO_SOCK, host, data });
export const wsMsgFromSock = (host, data) => ({ type: ActionTypes.WS_MSG_FROM_SOCK, host, data });
