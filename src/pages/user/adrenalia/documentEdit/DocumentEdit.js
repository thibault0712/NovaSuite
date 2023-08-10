import React, { useEffect, useState } from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import { RenderDocumentsButtons } from './hooks/renderDocumentsButtons';
import { RenderNodes } from './hooks/renderNodes';
import { HandleNewDocument } from './handleClick/handleNewDocument';
import './styles/style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { VerificationIfOpenable } from './components/verficationIfOpenable';
import { PopupSharing } from './hooks/popupSharing';
import { MdIosShare } from 'react-icons/md';
import { Store, ReactNotifications } from 'react-notifications-component';
import { GetUseInformation } from './request/getUserInformation';
import { PopupUserInformations } from './hooks/popupUserInformations';
import { SynchronizationObjectives } from './synchronization/synchronizationObjectives';
import {SynchronizationDocuments} from './synchronization/synchronizationDocuments'
import { SynchronizationNodes } from './synchronization/synshronizationNodes';
import { GetOwnerInformation } from './request/getOwnerInformations';
import { GetUsersSharedInformations } from './request/getUsersSharedInformations';

function DocumentEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const authentication = getAuth();
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(0);
  const [nodes, setNodes] = useState();
  const [objectives, setObjectives] = useState([]);
  const [blockedNodes, setBlockedNodes] = useState();
  const [formData, setFormData] = useState({title: '', content: ''});
  const [file, setFile] = useState("");
  const [open, setOpen] = useState();
  const [element, setElement] = useState();
  const [emailFormData, setEmailFormData] = useState({email: "", permission: "Editeur"});
  const [sharedError, setSharedError] = useState("")
  const [showSuccessNotif, setShowSuccessNotif] = useState(false);
  const [userData, setUserData] = useState([]);
  const [ownerData, setOwnerData] = useState();
  const [usersSharedData, setUsersSharedData] = useState([]); //Utiliser dans popupSharing

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const element = searchParams.get('element');
    try {
      onAuthStateChanged(authentication, async (user) => {
        if (!user) {
          navigate('/login');
        }
        if (element === null){
          navigate('/')
        }
        GetUseInformation(setUserData, user.uid, element)
        VerificationIfOpenable(element, user.uid, navigate);
        GetOwnerInformation(setOwnerData, element)
        setElement(element)
      });

      window.history.pushState(null, null, document.URL);
      window.addEventListener('popstate', function(event) {
        navigate('/')
      });

      } catch (error) {
        console.error('Erreur lors de la récupération des documents:', error);
      }
  }, [authentication, location.search, navigate]);

  SynchronizationDocuments(setDocuments);
  SynchronizationNodes(setNodes, selectedDocument, documents, setBlockedNodes);
  SynchronizationObjectives(selectedDocument, documents, objectives, setObjectives)

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

  return (
    <div>
      <ReactNotifications />
      {open === "popupSharing" && PopupSharing(setOpen, setEmailFormData, emailFormData, element, sharedError, setSharedError, setShowSuccessNotif, ownerData, usersSharedData, userData, setUsersSharedData)}
      <header className="flex sticky top-0 z-50 items-center justify-between flex-wrap bg-gray-50 dark:bg-gray-900 p-3">
        <div className="flex items-center flex-shrink-0 text-slate-700 dark:text-white mr-6">
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
      <div className='flex sticky top-14 z-50 border-t border-b border-t-slate-700/50 dark:border-t-slate-500/30 border-b-slate-700/50 dark:border-b-slate-500/30 bg-gray-50 dark:bg-gray-900'>
        <div className="flex text-slate-400 text-xs leading-6 overflow-x-auto scrollbar-none">
          {RenderDocumentsButtons(documents, selectedDocument, setSelectedDocument, open, setOpen, formData, setFormData, nodes, objectives, element)}
        </div>
        <div className='flex items-end ml-auto'>
          <button onClick={() => HandleNewDocument(documents, element, setSelectedDocument)} className="flex-none text-slate-700 dark:text-gray-400 font-bold border-l border-l-slate-700/50 dark:border-l-slate-500/30 px-3 py-1 flex items-center h-full">+</button>
          <Link className="h-full" to={'/adrenalia/view?element=' + element}>
            <button className="flex-none text-slate-700 dark:text-gray-400 font-bold border-l border-l-slate-700/50 dark:border-l-slate-500/30 px-3 py-1 flex items-center h-full"><MdRemoveRedEye /></button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        {RenderNodes(nodes, objectives, documents, selectedDocument, blockedNodes, formData, setFormData, setFile, file, element)}         
      </div>
    </div>
  );
}

export default DocumentEdit;