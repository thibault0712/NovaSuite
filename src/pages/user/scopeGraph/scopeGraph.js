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
import TextUpdaterNode from './hooks/textUpdaterNode';

function ScopeGraph() {
  const navigate = useNavigate();
  const location = useLocation();
  const authentication = getAuth();
  const [userData, setUserData] = useState([]);
  
  const initialNodes = [
    {
      id: '0',
      data: { label: 'Node' },
      position: { x: 0, y: 50 },
      type: 'textUpdater'
    },
  ];
  
  let id = 1;
  const getId = () => `${id++}`;
  
  const fitViewOptions = {
    padding: 3,
  };

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const element = searchParams.get('element');
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
      <Nodes initialNodes={initialNodes} getId={getId} fitViewOptions={fitViewOptions}/>
    </ReactFlowProvider>
    </>);
};

export default ScopeGraph;