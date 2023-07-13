import React, { useEffect, useState } from 'react';
import { GetNodes } from './request/getNodes';
import { GetObjectives } from './request/getObjectives';
import { GetDocuments } from './request/getDocuments';
import { RenderDocumentsButtons } from './hooks/renderDocumentsButtons';
import { RenderNodes } from './hooks/renderNodes';
import { MdModeEdit } from 'react-icons/md'
import './styles/style.css';
import { Link } from 'react-router-dom';

function DocumentView() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(0);
  const [nodes, setNodes] = useState();
  const [objectives, setObjectives] = useState([]);
  const [update, setUpdate] = useState();
  const [blockedNodes, setBlockedNodes] = useState()

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        GetDocuments().then((documents) => {
          setDocuments(documents);
          const sortDocuments = [...documents].sort((a, b) => a.position - b.position);

          GetNodes(sortDocuments[parseInt(selectedDocument)].id).then((result, i) => {
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
            GetObjectives(sortDocuments[parseInt(selectedDocument)].id, sortedResult).then((result) => {
              setObjectives(result);
            });
          });
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des documents:', error);
      }
    };

    fetchDocuments();
    console.log("refresh");
  }, [selectedDocument, update]);

  return (
    <div>
      <header className="flex items-center justify-between flex-wrap bg-slate-700 p-3">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <img className="fill-current h-10 w-10 mr-2" src={require("../../../data/images/logo.png")} alt="logo"></img>
          <span className="font-semibold text-xl tracking-tight">Adrenalia</span>
        </div>
      </header>
      <div className='flex border-t border-b border-t-slate-500/30 border-b-slate-500/30 bg-slate-700'>
        <div className="flex text-slate-400 text-xs leading-6 overflow-x-auto scrollbar-none">
          {RenderDocumentsButtons(documents, selectedDocument, setSelectedDocument)}
        </div>
        <div className='flex items-end ml-auto'>
          <Link className="h-full" to={'/edition'}>
            <button className="flex-none text-gray-400 font-bold border-l border-r border-l-slate-500/30 border-r-slate-500/30 px-3 py-1 flex items-center h-full"><MdModeEdit /></button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        {RenderNodes(nodes, objectives, documents, selectedDocument, setUpdate, blockedNodes)}         
      </div>
    </div>
  );
}

export default DocumentView;