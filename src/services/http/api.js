import axios from 'axios';
import { HASH as hash, TS as ts, APIKEY as apikey } from 'constants';
import apiConfig from './apiConfig';

const api = axios.create(apiConfig)

api.interceptors.request.use(
  requestConfig => {
    requestConfig.params = {...requestConfig.params, apikey: '58a5f2babe40e11dc864e7ba20079e35' };
    requestConfig.url = `${requestConfig.baseURL}`
    return requestConfig
  },
  error => Promise.reject(error)
)

// Add a response interceptor
api.interceptors.response.use(
  res => {
    let response = res.data
    let error
    if (!!response && response.error) {
      error = response.error || {}
      response = {
        error: {
          status: 'ERROR',
          code: error.errorCode || 'Unknown',
          message: error.description || 'Unknown Error'
        }
      }
    }

    return response
  },
  error => {
    let err = error.response || {}
    let code = err.status
    let message
    let status = 'ERROR'
    let errorObj
    if (err.status === 401) {
      message = 'Unauthorized'
    } else if (err.status === 404) {
      message = 'Item not found'
    } else {
      message = 'Unexpected error occurred. Please contact system administrator.'
    }
    errorObj = {
      status,
      code,
      message
    }

    return Promise.reject(errorObj)
  }
)

export default api
