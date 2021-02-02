import React from 'react';
import { Provider } from 'react-redux';
// import { hot } from 'react-hot-loader/root';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Routes from '../../routes';
import configureStore from '../../store/configureStore';
import rootReducer from 'reducers/index';

const store = configureStore(rootReducer);


function App() {
  return (
    <Provider store={store}>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div id="modal"></div>
    </Provider>
  );
}
export default App;
// export default hot(App);