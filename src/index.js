import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home'
import LoginPage from './LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Videos from './Videos';
import StreamPage from './StreamPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  }, {
    path: "/home",
    element: <Home />
  }, {
    path: "/videos",
    element: <Videos />
  },{
    path: "/stream/:username",
    element: <StreamPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <RouterProvider router={router} />



);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
