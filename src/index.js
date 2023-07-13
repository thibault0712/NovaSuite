import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DocumentView from './pages/user/documentView/DocumentView';
import DocumentEdit from './pages/user/documentEdit/DocumentEdit';
import reportWebVitals from './reportWebVitals';

const documentView = createBrowserRouter([
  {
    path: "/",
    element: <DocumentView />,
  },
  {
    path: "/edition",
    element: <DocumentEdit />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={documentView} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
