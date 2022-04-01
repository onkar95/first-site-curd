import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import './index.css'
import { HashRouter } from 'react-router-dom';
import store from "./component/redux/Store";
import { Provider } from "react-redux";


ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
  ,
  document.getElementById('root')
);

// reportWebVitals();
