import React, { useEffect, useState } from 'react';
import { RenderDocumentsButtons } from './hooks/renderDocumentsButtons';
import { RenderNodes } from './hooks/renderNodes';
import { MdIosShare, MdModeEdit } from 'react-icons/md'
import './styles/style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { VerificationIfOpenable } from './components/verficationIfOpenable';
import { PopupSharing } from './hooks/popupSharing';
import { Store, ReactNotifications } from 'react-notifications-component';
import { PopupUserInformations } from './hooks/popupUserInformations';
import { GetUseInformation } from './request/getUserInformation';
import { SynchronizationDocuments } from './synchronization/synchronizationDocuments';
import { SynchronizationNodes } from './synchronization/synshronizationNodes';
import { SynchronizationObjectives } from './synchronization/synchronizationObjectives';
import { GetOwnerInformation } from './request/getOwnerInformations';
import { GetUsersSharedInformations } from './request/getUsersSharedInformations';

function DocumentView() {
  const navigate = useNavigate();
  const location = useLocation();
  const authentication = getAuth();
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(0);
  const [nodes, setNodes] = useState();
  const [objectives, setObjectives] = useState([]);
  const [blockedNodes, setBlockedNodes] = useState();
  const [element, setElement] = useState();
  const [open, setOpen] = useState();
  const [emailFormData, setEmailFormData] = useState({email: "", permission: "Editeur"});
  const [sharedError, setSharedError] = useState("")
  const [showSuccessNotif, setShowSuccessNotif] = useState(false);
  const [userData, setUserData] = useState([]);
  const [ownerData, setOwnerData] = useState();
  const [usersSharedData, setUsersSharedData] = useState([]); //Utiliser dans popupSharing


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
        GetOwnerInformation(setOwnerData, element)
        setElement(element)
      });

      window.history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function(event) {
        navigate('/')
      });

      } catch (error) {
        console.error('Erreur lors de la récupération des documents:', error);
        navigate('/')
      }
  }, [authentication, navigate, location.search]);

  useEffect(() => {
    if (showSuccessNotif === true){
      Store.addNotification({
        title: "Succès",
        message: "Le fichier vient d'être partagé avec succès !",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
      setShowSuccessNotif(false)
    }
  }, [showSuccessNotif])

  useEffect(() => {
    if (sharedError !== ""){
      Store.addNotification({
        title: "Erreur",
        message: sharedError,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
      setSharedError("")
    }
  }, [sharedError])

  SynchronizationDocuments(setDocuments);
  SynchronizationNodes(setNodes, selectedDocument, documents, setBlockedNodes);
  SynchronizationObjectives(selectedDocument, documents, objectives, setObjectives)

  return (
    <div>
      <ReactNotifications />
      {open === "popupSharing" && PopupSharing(setOpen, setEmailFormData, emailFormData, element, sharedError, setSharedError, setShowSuccessNotif, ownerData, usersSharedData, userData, setUsersSharedData)}
      <header className="flex sticky top-0 z-50 items-center justify-between flex-wrap bg-gray-50 dark:bg-gray-900 p-3">
        <div className="flex items-center flex-shrink-0 text-slate-700 dark:text-white">
          <Link to={'/'}><img className="fill-current h-10 w-10 mr-2" src={require("../../../../data/images/logo.png")} alt="logo"></img></Link>
          <span className="font-semibold text-xl tracking-tight">Adrenalia</span>
        </div>
        <div className="flex items-center mr-2">
          <button onClick={async () => {setUsersSharedData(await GetUsersSharedInformations(element)); setOpen("popupSharing")}} className='flex text-white rounded px-2 py-1 bg-blue-700 hover:bg-blue-700/30 dark:bg-purple-700 dark:hover:dark:bg-purple-700/30 mr-4'>
            <MdIosShare className='w-5 h-auto text-inherit'/>
            <span className='text-inhertir ml-1 font-semibold text-m'>Partager</span>
          </button>
          {PopupUserInformations(userData, navigate, authentication)}
        </div>
      </header>
      <div style={{top: 64}} className='flex sticky top-14 z-50 border-t border-b border-t-slate-700/50 dark:border-t-slate-500/30 border-b-slate-700/50 dark:border-b-slate-500/30 bg-gray-50 dark:bg-gray-900'>
        <div className="flex text-slate-400 text-xs leading-6 overflow-x-auto scrollbar-none">
          {RenderDocumentsButtons(documents, selectedDocument, setSelectedDocument)}
        </div>
        <div className='flex items-end ml-auto'>
          <Link className="h-full" to={'/adrenalia/edition?element=' + element}>
            <button className="flex-none text-slate-700 dark:text-gray-400 font-bold border-l border-r border-l-slate-700/50 dark:border-l-slate-500/30 border-r-slate-700/50 dark:border-r-slate-500/30 px-3 py-1 flex items-center h-full"><MdModeEdit /></button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        {RenderNodes(nodes, objectives, documents, selectedDocument, blockedNodes, element, userData)}         
      </div>
    </div>
  );
}

export default DocumentView;