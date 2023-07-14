import React, { useEffect, useState } from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import { GetNodes } from './request/getNodes';
import { GetObjectives } from './request/getObjectives';
import { GetDocuments } from './request/getDocuments';
import { RenderDocumentsButtons } from './hooks/renderDocumentsButtons';
import { RenderNodes } from './hooks/renderNodes';
import { HandleNewDocument } from './handleClick/handleNewDocument';
import './styles/style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { VerificationIfOpenable } from '../documentView/components/verficationIfOpenable';

function DocumentEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const authentication = getAuth();
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(0);
  const [nodes, setNodes] = useState();
  const [objectives, setObjectives] = useState([]);
  const [update, setUpdate] = useState();
  const [blockedNodes, setBlockedNodes] = useState();
  const [formData, setFormData] = useState({title: '', content: ''});
  const [file, setFile] = useState("");
  const [open, setOpen] = useState();
  const [element, setElement] = useState();

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
        VerificationIfOpenable(element, user.uid, navigate);
        setElement(element)
      });
      GetDocuments(element).then((documents) => {
        setDocuments(documents);
        const sortDocuments = [...documents].sort((a, b) => a.position - b.position);

        GetNodes(sortDocuments[parseInt(selectedDocument)].id, element).then((result, i) => {
          const sortedResult = result.sort((a, b) => a.node - b.node);
          setNodes(sortedResult);
          var dataBlockedNode = 0;
          sortedResult.map((node, key) => {
            if (node.objectives !== node.resolvedObjectives && dataBlockedNode === 0) {
              dataBlockedNode = key + 1;
            }
            return null;
          });
          setBlockedNodes(dataBlockedNode);
          GetObjectives(sortDocuments[parseInt(selectedDocument)].id, sortedResult, element).then((result) => {
            setObjectives(result);
          });
        });
      });
      } catch (error) {
        console.error('Erreur lors de la récupération des documents:', error);
      }

    console.log("refresh");
  }, [selectedDocument, update, authentication, location.search, navigate]);

  return (
    <div>
      <header className="flex sticky top-0 z-50 items-center justify-between flex-wrap bg-gray-50 dark:bg-gray-900 p-3">
        <div className="flex items-center flex-shrink-0 text-slate-700 dark:text-white mr-6">
          <Link to={'/'}><img className="fill-current h-10 w-10 mr-2" src={require("../../../../data/images/logo.png")} alt="logo"></img></Link>
          <span className="font-semibold text-xl tracking-tight">Adrenalia</span>
        </div>
      </header>
      <div className='flex sticky top-14 z-50 border-t border-b border-t-slate-700/50 dark:border-t-slate-500/30 border-b-slate-700/50 dark:border-b-slate-500/30 bg-gray-50 dark:bg-gray-900'>
        <div className="flex text-slate-400 text-xs leading-6 overflow-x-auto scrollbar-none">
          {RenderDocumentsButtons(documents, selectedDocument, setSelectedDocument, open, setOpen, setUpdate, formData, setFormData, nodes, objectives, element)}
        </div>
        <div className='flex items-end ml-auto'>
          <button onClick={() => HandleNewDocument(documents, setDocuments, element, setSelectedDocument, setUpdate)} className="flex-none text-slate-700 dark:text-gray-400 font-bold border-l border-l-slate-700/50 dark:border-l-slate-500/30 px-3 py-1 flex items-center h-full">+</button>
          <Link className="h-full" to={'/adrenalia/view?element=' + element}>
            <button className="flex-none text-slate-700 dark:text-gray-400 font-bold border-l border-l-slate-700/50 dark:border-l-slate-500/30 px-3 py-1 flex items-center h-full"><MdRemoveRedEye /></button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        {RenderNodes(nodes, objectives, documents, selectedDocument, setUpdate, blockedNodes, formData, setFormData, setFile, file, element)}         
      </div>
    </div>
  );
}

export default DocumentEdit;