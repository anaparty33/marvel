import { BASE_URL } from 'constants';
const apiConfig = {
  baseURL: BASE_URL,
  transformRequest: [
    function(data, headers) {
      // Do whatever you want to transform the data
      if(headers['no_transform'] == true) {
        delete headers['no_transform'];
        return data;
      } else {
        return JSON.stringify(data);
      }
    }
  ],

  transformResponse: [
    function(data) {
      // Do whatever you want to transform the data
      return data
    }
  ],

  // `headers` are custom headers to be sent
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Pragma': 'no-cache'
  },

  // flag to check whether to send auth token or not
  isPrivate: true,
  timeout: 30000,
  // `withCredentials` indicates whether or not cross-site Access-Control requestsshould be made using credentials
  withCredentials: false,
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8'// default

  
}
export default apiConfig
