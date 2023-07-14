import {MdMoreVert, MdOutlineDriveFileRenameOutline, MdDelete} from "react-icons/md";
import Popup from 'reactjs-popup';
import './styles/popupMenu.css'
import { PopupEditTitleDocument } from "./popupEditTitleDocument";
import { PopupRemoveDocument } from "./popupRemoveDocument";
import { useRef } from "react";

export function RenderDocumentsButtons(documents, selectedDocument, setSelectedDocument, open, setOpen, setUpdate, formData, setFormData, nodes, objectives, element) {
    const ref = useRef()
    const closeModal = () =>  ref.current.close();
    return  documents
      ?.sort((a, b) => a.position - b.position)
      .map((document, i) => {
        return (
          <div key={i}>
            {open === "editDocumentTitle" && i === 0 && PopupEditTitleDocument(setOpen, formData, setFormData, selectedDocument, documents, setUpdate, element)}
            {open === "removeDocument" && i === 0 && PopupRemoveDocument(setOpen, selectedDocument, setUpdate, documents, setSelectedDocument, nodes, objectives, element)}
            {parseInt(selectedDocument) === i && (
              <div className="flex">
                <button className="flex-none border-t border-b dark:border-b-slate-700 border-t-blue-400 dark:border-t-sky-300 text-blue-400 dark:text-sky-300 dark:border-r-slate-500/30 pl-4 py-1 flex items-center whitespace-nowrap">
                  {document.title}
                </button>
                <Popup className="popupMenu"
                trigger={<button className="flex-none border-t border-b dark:border-b-slate-700 border-t-blue-400 dark:border-t-sky-300 text-blue-400 dark:text-sky-300 border-r border-r-slate-700/50 dark:border-r-slate-500/30  px-2 py-1 flex items-center whitespace-nowrap">
                  <MdMoreVert />
                </button>}
                position={['bottom left']}
                ref={ref}
                >                  
                <div>   
                  <button onClick={() => {closeModal(); setOpen("editDocumentTitle")}} className="text-xs text-slate-700 dark:text-white w-full py-2 border-b-500/30 hover:bg-slate-300 dark:hover:bg-slate-800 border-b border-b-gray-500/30">
                    <div className="inline-flex items-center" style={{margin: '0 auto'}}>
                      <MdOutlineDriveFileRenameOutline className="h-full mr-1"/>
                      <span className="text-center">Renommer</span>
                    </div>
                  </button>
                </div>
                <div>
                <button onClick={() => {closeModal(); setOpen("removeDocument")}} className="text-xs text-red-500 w-full py-2 border-b-500/30 hover:bg-red-500 hover:text-white">
                  <div className="inline-flex items-center" style={{margin: '0 auto'}}>
                    <MdDelete className="h-full mr-1"/>
                    <span className="text-center">Supprimer</span>
                  </div>
                </button>
                </div>
              </Popup>
              </div>
            )}
            {parseInt(selectedDocument) !== i && (
              <div className="flex">
              <button onClick={() => setSelectedDocument(i)} className="flex-none border-r text-neutral-800 dark:text-gray-400 border-r-slate-700/50 dark:border-r-slate-500/30 border-t border-t-transparent px-4 py-1 flex items-center whitespace-nowrap">
                {document.title}
              </button>
            </div>
            )}
          </div>
        );
      });
}