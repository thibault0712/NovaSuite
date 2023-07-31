import Popup from "reactjs-popup";
import { handleShareNewEmail } from "../handleClick/handleShareNewEmail";

export function PopupSharing(setOpen, setEmailFormData, emailFormData, element,sharedError, setSharedError, setShowSuccessNotif){
    const handleInputChange = (event) => {
        setEmailFormData({email: event.target.value})
    };
    return(
        <Popup
            modal
            defaultOpen
            nested
            onClose={() => {setOpen(""); setSharedError(""); setEmailFormData({email: ""})}}
        >
      {close => (
        <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pb-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '600px', maxHeight: '85vh' }}>
          <div className="mb-3 text-center text-xl py-3 font-bold text-black dark:text-white bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">Partager à un utilisateur</div>
          <div className="content mx-5 mt-4 text-justify">
            <div className='pt-1 pl-3'>
            <label className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Email</label>
            <input
                name='email'
                className={`shadow-inner bg-white/20 dark:bg-gray-600/50 appearance-none border rounded w-full py-2 px-3 ${sharedError !== "" ? "border-red-600" : "border-slate-700"} text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline`}
                id="email"
                type="email"
                placeholder="Email de l'utilisateur"
                value={emailFormData.email}
                onChange={handleInputChange}
              />
              {sharedError !== "" && <p className="text-red-500">{sharedError}</p>}
            </div>
          </div>
          <div className="pt-4 flex justify-end mr-5">
            <button className="bg-green-500 w-30 text-white font-bold py-2 px-4 rounded" onClick={() => handleShareNewEmail(element, emailFormData.email, setSharedError, setShowSuccessNotif, close)}>Envoyer</button>
          </div>
        </div>
      )}
        </Popup>
    )
}