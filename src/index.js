import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DocumentView from './pages/user/adrenalia/documentView/DocumentView';
import DocumentEdit from './pages/user/adrenalia/documentEdit/DocumentEdit';
import ScopeGraph from './pages/user/scopeGraph/scopeGraph';
import Login from './pages/connection/login';
import Inscription from './pages/connection/inscription';
import Home from './pages/user/homePages/home/Home';
import Files from './pages/user/homePages/files/files';
import Shared from './pages/user/homePages/shared/shared'
import UserProfilEdition from './pages/user/settings/userProfilEdition/UserProfilEdition';
import reportWebVitals from './reportWebVitals';
import Presentation from './pages/presentation';

const documentView = createBrowserRouter([
  {
    path: "/inscription",
    element: <Inscription />,
  },
  {
    path: "/presentation",
    element: <Presentation />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/fichiers",
    element: <Files />,
  },
  {
    path: "/partages",
    element: <Shared />,
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
  {
    path: "/scopegraph",
    element: <ScopeGraph />,
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
