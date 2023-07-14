import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DocumentView from './pages/user/adrenalia/documentView/DocumentView';
import DocumentEdit from './pages/user/adrenalia/documentEdit/DocumentEdit';
import Login from './pages/connection/login';
import Inscription from './pages/connection/inscription';
import Home from './pages/user/Home';
import UserProfilEdition from './pages/user/settings/userProfilEdition/UserProfilEdition';
import reportWebVitals from './reportWebVitals';

const documentView = createBrowserRouter([
  {
    path: "/inscription",
    element: <Inscription />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/monCompte",
    element: <UserProfilEdition />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/adrenalia/view",
    element: <DocumentView />,
  },
  {
    path: "/adrenalia/edition",
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
