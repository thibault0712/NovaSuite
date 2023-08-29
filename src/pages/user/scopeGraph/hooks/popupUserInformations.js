import Avatar from 'react-avatar';
import Popup from 'reactjs-popup';
import { HandleLogOut } from '../handleClick/handleLogOut';
import { MdLogout, MdOutlineSettings, MdPeople } from 'react-icons/md';
import { Link } from 'react-router-dom';

export function PopupUserInformations(userData, navigate, authentication){
    if (userData.length === 0)
        return(<div className='h-12 w-12'></div>)
    else
        return(
            <Popup
            trigger={<button className="rounded-full h-12 w-12 flex items-center justify-center text-white">
                        {<Avatar round size='50' name={userData.userName} textSizeRatio={3} />}
                    </button>}
            modal
            nested
            >
                {close => (
                <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pt-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '350px', maxHeight: '85vh' }}>
                    <div className='text-center'>
                        <Avatar round size='100' name={userData.userName} textSizeRatio={3} />
                        <p className='text-xl mt-3 font-bold text-black dark:text-white'>{userData.userName}</p>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex flex-col py-6 mx-auto px-3'>
                            <Link to={"/monCompte"} className="bg-gray-200 hover:bg-gray-200/30 shadow-inner dark:bg-gray-800 dark:hover:bg-gray-800/30 w-72 text-gray-900 dark:text-white font-bold py-3 rounded flex items-center justify-center">
                                <MdPeople className="mr-2 w-5 h-auto text-gray-900 dark:text-white" /> Mon compte
                            </Link>
                            <Link to={"/monCompte"} className="bg-gray-200 hover:bg-gray-200/30 shadow-inner dark:bg-gray-800 dark:hover:bg-gray-800/30 w-72 text-gray-900 dark:text-white font-bold py-3 my-3 rounded flex items-center justify-center">
                                <MdOutlineSettings className="mr-2 w-5 h-auto text-gray-900 dark:text-white" /> Paramètres
                            </Link>
                            <button className="bg-red-500 hover:bg-white w-72 shadow-inner text-white hover:text-red-500 font-bold py-3 rounded-b rounded flex items-center justify-center" onClick={() => HandleLogOut(navigate, authentication)}>
                                <MdLogout className="mr-2 w-5 h-auto text-white hover:text-red-500" /> Se déconnecter
                            </button>
                        </div>
                    </div>
                </div>
                )}
            </Popup>
        )
}