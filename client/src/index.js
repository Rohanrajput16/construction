import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import commonReducer from './reducers/commonReducer';
import { BrowserRouter} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";

const store = configureStore({
  reducer: {
   commonReducer:commonReducer,
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);
{/* <React.StrictMode></React.StrictMode> */}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
