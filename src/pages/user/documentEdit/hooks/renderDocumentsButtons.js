import {MdMoreVert, MdOutlineDriveFileRenameOutline, MdDelete} from "react-icons/md";
import Popup from 'reactjs-popup';
import './styles/popupMenu.css'
import { PopupEditTitleDocument } from "./popupEditTitleDocument";
import { PopupRemoveDocument } from "./popupRemoveDocument";
import { useRef } from "react";

export function RenderDocumentsButtons(documents, selectedDocument, setSelectedDocument, open, setOpen, setUpdate, formData, setFormData) {
    const ref = useRef()
    const closeModal = () =>  ref.current.close();
    return  documents
      ?.sort((a, b) => a.position - b.position)
      .map((document, i) => {
        return (
          <div key={i}>
            {open === "editDocumentTitle" && i === 0 && PopupEditTitleDocument(setOpen, formData, setFormData, selectedDocument, documents, setUpdate)}
            {open === "removeDocument" && i === 0 && PopupRemoveDocument(setOpen, selectedDocument, setUpdate, documents, setSelectedDocument)}
            {parseInt(selectedDocument) === i && (
              <div className="flex">
                <button className="flex-none text-sky-300 border-t border-b border-b-slate-700 border-t-sky-300 pl-4 py-1 flex items-center whitespace-nowrap">
                  {document.title}
                </button>
                <Popup className="popupMenu"
                trigger={<button className="flex-none text-sky-300 border-r border-r-slate-500/30 border-t border-t-sky-300 px-2 py-1 flex items-center whitespace-nowrap">
                  <MdMoreVert />
                </button>}
                position={['bottom left']}
                ref={ref}
                >                  
                <div>   
                  <button onClick={() => {closeModal(); setOpen("editDocumentTitle")}} className="text-xs text-white w-full py-2 border-b-500/30 hover:bg-slate-600 border-b border-b-gray-500/30">
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
              <button onClick={() => setSelectedDocument(i)} className="flex-none border-r text-gray-400 border-r-slate-500/30 border-t border-t-transparent px-4 py-1 flex items-center whitespace-nowrap">
                {document.title}
              </button>
            </div>
            )}
          </div>
        );
      });
}