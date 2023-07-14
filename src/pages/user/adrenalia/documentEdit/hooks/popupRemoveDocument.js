import Popup from "reactjs-popup";
import './styles/popup.css'
import { HandleDeletDocument } from "../handleClick/handleDeletDocument";

export function PopupRemoveDocument(setOpen, selectedDocument, setUpdate, documents, setSelectedDocument, nodes, objectives, element){
  return(
    <Popup
      open={true}
      modal
      nested
      onClose={() => setOpen("none")} // Set setOpen("none") when the popup is closed
    >
      {close => (
        
        <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pb-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '600px', maxHeight: '85vh' }}>
          <div className="mb-3 text-center text-xl py-3 font-bold text-black dark:text-white bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">Êtes-vous sûr de vouloir supprimer le document ?</div>

          <div className="pt-4 flex justify-end mr-5">
            <div style={{margin: '0 auto'}}>
                <button onClick={() => close()} className="bg-green-500 w-30 text-white font-bold py-2 px-4 rounded mr-5">Annuler</button>
                {documents.length > 1 && <button onClick={() => {HandleDeletDocument(selectedDocument, setUpdate, documents, setSelectedDocument, nodes, objectives, element); close()}} className="bg-red-500 w-30 text-white font-bold py-2 px-4 rounded">Confirmer</button>}
                {documents.length === 1 && <button className="bg-red-800/80 w-30 text-white font-bold py-2 px-4 rounded cursor-not-allowed">Confirmer</button>}
            </div>

          </div>
        </div>
      )}
    </Popup>
  )
}