import React, { useEffect, useState } from 'react';
import './styles/style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { VerificationIfOpenable } from './components/verficationIfOpenable';
import { GetUseInformation } from './request/getUserInformation';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import {ScopeGraphHeader} from './hooks/scopeGraphHeader';
import {Nodes} from './hooks/nodes'

function ScopeGraph() {
  const navigate = useNavigate();
  const location = useLocation();
  const authentication = getAuth();
  const [userData, setUserData] = useState([]);
  const [element, setElement] = useState();
  
  const fitViewOptions = {
    padding: 3,
  };

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const element = searchParams.get('element');
      setElement(element)
      onAuthStateChanged(authentication, async (user) => {
        if (!user) {
          navigate('/login');
        }
        if (element === null){
          navigate('/')
        }
        VerificationIfOpenable(element, user.uid, navigate);
        GetUseInformation(setUserData, user.uid, element)
      });

      window.history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function(event) {
        navigate('/')
      });

      } catch (error) {
        navigate('/')
      }

  }, [authentication, navigate, location.search]);

  return(    
    <>
    <ScopeGraphHeader userData={userData} authentication={authentication} navigate={navigate}/>
    <ReactFlowProvider>
      <Nodes element={element} fitViewOptions={fitViewOptions}/>
    </ReactFlowProvider>
    </>);
};

export default ScopeGraph;