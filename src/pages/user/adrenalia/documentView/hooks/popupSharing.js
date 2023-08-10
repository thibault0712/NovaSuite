import Popup from "reactjs-popup";
import { handleShareNewEmail } from "../handleClick/handleShareNewEmail";
import Avatar from "react-avatar";
import { HandleChangePermission } from "../handleClick/handleChangePermission";

export function PopupSharing(setOpen, setEmailFormData, emailFormData, element, sharedError, setSharedError, setShowSuccessNotif, ownerData, usersSharedData, userData, setUsersSharedData){
    const handleInputChange = (event) => {
        setEmailFormData({email: event.target.value, permission: emailFormData.permission})
    };
    
    if (!ownerData || !usersSharedData || !userData){
      return;
    }

    const handleRoleChange = (e, userUID) => {
      HandleChangePermission(e.target.value, userUID, element, setUsersSharedData, usersSharedData);
    };

    const handleNewRoleChange = (event) => {
      setEmailFormData({email: emailFormData.email, permission: event.target.value})
    };

    return(
        <Popup
            modal
            defaultOpen
            nested
            onClose={() => {setOpen(""); setSharedError(""); setEmailFormData({email: "", permission: "Editeur"})}}
        >
      {close => (
        <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pb-4 mx-4 my-6 shadow-md" style={{ width: '85vw', maxWidth: '600px' }}>
          <div className="mb-3 text-center text-xl py-3 font-bold text-black dark:text-white">Partager à un utilisateur</div>
          <div className="content mx-5 mt-4 text-justify">
            <div className='pt-1 pl-3'>
              <label className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Email</label>
                <div className="flex flex-col sm:flex-row">
                  <input
                    name="email"
                    className={`shadow-inner bg-white/20 dark:bg-gray-600/50 appearance-none border rounded md:rounded-r-none flex-grow py-2 px-3 ${sharedError !== "" ? "border-red-600" : "border-slate-700"} text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline mb-2 sm:mb-0`}
                    id="email"
                    type="email"
                    placeholder="Email de l'utilisateur"
                    value={emailFormData.email}
                    onChange={handleInputChange}
                  />
                  <select
                    onChange={(e) => handleNewRoleChange(e)}
                    className="bg-gray-50 border w-full sm:w-24 border-gray-300 text-gray-900 text-sm rounded md:rounded-l-none focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="Editeur">Editeur</option>
                    <option value="Actionneur">Actionneur</option>
                    <option value="Lecteur">Lecteur</option>
                  </select>
                </div>
              </div>
            </div>
          <div className="pt-4 flex justify-end mr-5 mb-3">
            <button className="bg-green-500 w-30 text-white font-bold py-2 px-4 rounded" onClick={() => handleShareNewEmail(element, emailFormData.email, emailFormData.permission, setSharedError, setShowSuccessNotif, usersSharedData, setUsersSharedData)}>Envoyer</button>
          </div>
          <div className="pl-3 mx-5">
            <p className="text-black dark:text-white text-lg tracking-wide font-medium mb-2">Utilisateurs ayant accès</p>
            <ul className="rounded-lg divide-y divide-slate-700/50 dark:divide-slate-500/30 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500/50 dark:scrollbar-thumb-slate-600/50" style={{maxHeight: '30vh'}}>
              <li className="flex flex-col sm:flex-row items-center justify-between p-4">
                <div className="flex items-center flex-col sm:flex-row justify-center sm:justify-start">
                  <div className="mb-2 sm:mb-0">
                    <Avatar round size='40' name={ownerData.userName} textSizeRatio={3} />
                  </div>
                  <div className="ml-0 mt-2 sm:ml-4 sm:mt-0 text-center sm:text-left">
                    <p className="dark:text-white text-black">{ownerData.userName}</p>
                    <p className="text-sm dark:text-white/80 text-black/80">{ownerData.email}</p>
                  </div>
                </div>
                <p className="mt-2 sm:mt-0 text-center sm:text-right dark:text-white/30 text-black/60 sm:w-1/5">
                  Propriétaire
                </p>
              </li>
              {
                userData.uid === ownerData.uid ?
                  usersSharedData.map((user) => (
                      <li className="flex flex-col sm:flex-row items-center justify-between p-4" key={user.id}>
                        <div className="flex items-center flex-col sm:flex-row justify-center sm:justify-start">
                          <div className="mb-2 sm:mb-0">
                            <Avatar round size='40' name={user.userName} textSizeRatio={3} />
                          </div>
                          <div className="ml-0 mt-2 sm:ml-4 sm:mt-0 text-center sm:text-left">
                            <p className="dark:text-white text-black">{user.userName}</p>
                            <p className="text-sm dark:text-white/80 text-black/80">{user.email}</p>
                          </div>
                        </div>
                        <div className="relative top-2">
                        <select onChange={(e) => handleRoleChange(e, user.id)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={user.permission}>{user.permission}</option>
                            {user.permission !== "Editeur" && <option value="Editeur">Editeur</option>}
                            {user.permission !== "Actionneur" && <option value="Actionneur">Actionneur</option>}
                            {user.permission !== "Lecteur" && <option value="Lecteur">Lecteur</option>}
                            <option className=" text-red-500" value="Expulser">Expulser</option>
                          </select>
                        </div>
                      </li>
                  ))
                :
                  usersSharedData.map((user) => (
                    <li className="flex flex-col sm:flex-row items-center justify-between p-4" key={user.id}>
                      <div className="flex items-center flex-col sm:flex-row justify-center sm:justify-start">
                        <div className="mb-2 sm:mb-0">
                          <Avatar round size='40' name={user.userName} textSizeRatio={3} />
                        </div>
                        <div className="ml-0 mt-2 sm:ml-4 sm:mt-0 text-center sm:text-left">
                          <p className="dark:text-white text-black">{user.userName}</p>
                          <p className="text-sm dark:text-white/80 text-black/80">{user.email}</p>
                        </div>
                      </div>
                      <p className="mt-2 sm:mt-0 text-center sm:text-right dark:text-white/30 text-black/60 sm:w-1/5">
                        {user.permission}
                      </p>
                    </li>
              ))
              }
            </ul>
          </div>
        </div>
      )}
        </Popup>
    )
}