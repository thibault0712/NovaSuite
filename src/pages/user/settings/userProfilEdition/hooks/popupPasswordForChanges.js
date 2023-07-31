import Popup from "reactjs-popup";
import { HandleSaveChanges } from "../handleCLick/handleSaveChanges";

export function PopupPasswordForChanges(setPassword, password, setShowPopup,formData, firstFormData, userUID, authentication, navigate, setError, setUpdateNotif){
    const handleInputChange = (event) => {
        setPassword(event.target.value); // Update the input value when it changes
      };
    return(
        
        <Popup
          defaultOpen
          modal
          nested
          onClose={() => {setShowPopup(false); setPassword('')}} // Set setOpen("none") when the popup is closed
        >
          {close => (
            
            <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pb-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '600px', maxHeight: '85vh' }}>
              <div className="mb-3 text-center text-xl py-3 font-bold text-black dark:text-white bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">Rentrer le mot de passe</div>
              <div className="content mx-5 mt-4 text-justify">
                <div>
                  <p className='text-black dark:text-white text-sm tracking-wide ml-2 font-medium mb-2'>Mot de passe</p>
                </div>
                <div className='pt-1 pl-3'>
                <input
                    name='password'
                    className="shadow-inner bg-white/20 dark:bg-gray-600/50 appearance-none border rounded w-full py-2 px-3 border-slate-700 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Entrer votre mot de passe"
                    value={password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end mr-5">
                <button className="bg-green-500 w-30 text-white font-bold py-2 px-4 rounded" onClick={() => {HandleSaveChanges(formData, firstFormData, userUID, authentication, navigate, setError, setUpdateNotif, password); close()}}>Confirmer</button>
              </div>
            </div>
          )}
        </Popup>
      )
}