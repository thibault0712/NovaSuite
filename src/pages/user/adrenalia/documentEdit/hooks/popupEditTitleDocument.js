import Popup from "reactjs-popup";
import './styles/popup.css'
import { HandleRenameDocument } from "../handleClick/handleRenameDocument";

export function PopupEditTitleDocument(setOpen, formData, setFormData, selectedDocument, documents, element){
  
  if (documents[selectedDocument].id !== formData.documentId ){
    setFormData({title: documents[selectedDocument].title, documentId: documents[selectedDocument].id})
  }
  
  const handleInputChange = (event) => {
    setFormData({title: event.target.value, documentId: formData.documentId}); // Update the input value when it changes
  };
  
  return(
    <Popup
      defaultOpen
      modal
      nested
      onClose={() => setOpen("none")} // Set setOpen("none") when the popup is closed
    >
      {close => (
        <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pb-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '600px', maxHeight: '85vh' }}>
          <div className="mb-3 text-center text-xl py-3 font-bold text-black dark:text-white bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">Renommer l'objectif</div>
          <div className="content mx-5 mt-4 text-justify">
            <div>
              <p className='text-black dark:text-white text-sm tracking-wide ml-2 font-medium mb-2'>Titre</p>
            </div>
            <div className='pt-1 pl-3'>
            <input
                name='title'
                className="shadow-inner bg-white/20 dark:bg-gray-600/50 appearance-none border rounded w-full py-2 px-3 border-slate-700 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Entrer le nouveau titre ici"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end mr-5">
            <button className="bg-red-500 w-30 text-white font-bold py-2 px-4 rounded mr-5" onClick={() => {close()}}>Annuler</button>
            <button className="bg-green-500 w-30 text-white font-bold py-2 px-4 rounded" onClick={() => {HandleRenameDocument(selectedDocument, documents, formData.title, element); close()}}>Sauvegarder</button>
          </div>
        </div>
      )}
    </Popup>
  )
}