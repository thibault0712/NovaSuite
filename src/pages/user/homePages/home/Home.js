import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { MdOutlineDriveFileRenameOutline, MdDelete, MdAdd, MdHome, MdFolder, MdFolderShared, MdAddCircleOutline } from 'react-icons/md';
import { GetElementsInformations } from './resquest/getElementsInformations';
import { SelectImage } from './components/selectImage';
import { HandleOpen } from './handleClick/handleOpen';
import { HandleNewAdrenalia } from './handleClick/handleNewAdrenalia';
import Popup from 'reactjs-popup';
import { HandleRenameElement } from './handleClick/handleRenameElement';
import { HandlleRemoveElement } from './handleClick/handleRemoveElement';
import {GetUseInformation} from './resquest/getUserInformation'
import { PopupUserInformations } from './hooks/popupUserInformations';
import { Link } from 'react-router-dom';
import { DateTransform } from './components/dateTransform';
import Avatar from 'react-avatar';
import { Helmet } from 'react-helmet';
import NovaSuiteHeader from "../../../../data/images/NovaSuiteHeader.ico"


function Home() {
  const navigate = useNavigate();
  const authentication = getAuth();
  const [elements, setElements] = useState([]);
  const [userUID, setUserUID] = useState();
  const [inputValue, setInputValue] = useState();
  const [userData, setUserData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  };

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    onAuthStateChanged(authentication, async (user) => {
      if (!user) {
        navigate('/login');
      }
      GetUseInformation(setUserData, user.uid)
      GetElementsInformations(setElements, user.uid);
      setUserUID(user.uid);
    });
  }, [authentication, navigate]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-screen ">
      <Helmet>
        <title>Accueil - NovaSuite</title>
        <meta name="description" content="NovaSuite est une suite d'outils pour faciliter l'organisation au quotidien ou dans la gestion de projets en groupe ou en solo." />
        <meta name="keywords" content="NovaSuite, outils d'organisation, projet en groupe, projet en solo, accueil, home" />
        <link rel="icon" href={NovaSuiteHeader} />
        <link rel="apple-touch-icon" href={NovaSuiteHeader} />
      </Helmet>
      <header className="flex sticky top-0 z-50 items-center justify-between flex-wrap bg-white dark:bg-gray-900 p-3">
        <div className="flex items-center flex-shrink-0 text-white ml-4">
          <img
            className="fill-current h-12 w-auto mr-2"
            src={require('../../../../data/images/NovaSuite.png')}
            alt="logo"
          ></img>
        </div>
        <div className="flex items-center mr-2">
          {PopupUserInformations(userData, navigate, authentication)}
      </div>
      </header>
      <div className='flex w-full'>
      {isMobile === false ? <div className='bg-white fixed top-75 z-50 w-16 dark:bg-gray-900 h-full border-r border-r-slate-700/50 dark:border-r-slate-500/30' style={{ height: 'calc(100vh - 75px)' }}>
            <button onClick={async () => {const elementId = await HandleNewAdrenalia(userUID, userData.userName); navigate('/adrenalia/view?element=' + elementId)}} className='p-2 py-3 w-full hover:bg-gray-200 hover:dark:bg-gray-800/40 text-center flex justify-center text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-purple-700'>
              <div className='w-full mx-auto'>
                <MdAddCircleOutline className='w-6 h-auto text-center' style={{ color: 'inherit', margin: "0 auto" }} />
                <span className=' font-medium' style={{fontSize: 12}}>Créer</span>
              </div>          
            </button>          
            <Link className='border-l-4 border-l-blue-700 dark:border-l-purple-700 py-3 text-center flex justify-center text-blue-700 dark:text-purple-700'>            
              <div className='w-full mx-auto'>
                <MdHome className='w-6 h-auto text-center' style={{ color: 'inherit', margin: "0 auto" }} />
                <span className=' font-medium' style={{fontSize: 12}}>Accueil</span>
              </div>   
            </Link>
            <Link to={"/fichiers"} className='p-2 py-3 hover:bg-gray-200 hover:dark:bg-gray-800/40 text-center flex justify-center text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-purple-700'>
              <div className='w-full mx-auto'>
                <MdFolder className='w-6 h-auto text-center' style={{ color: 'inherit', margin: "0 auto" }} />
                <span className=' font-medium' style={{fontSize: 12}}>Fichiers</span>
              </div>          
            </Link>
            <Link to={"/partages"} className='p-2 py-3 hover:bg-gray-200 hover:dark:bg-gray-800/40 text-center flex justify-center text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-purple-700'>
              <div className='w-full mx-auto'>
                <MdFolderShared className='w-6 h-auto text-center' style={{ color: 'inherit', margin: "0 auto" }} />
                <span className=' font-medium' style={{fontSize: 12}}>Partagés</span>
              </div>
            </Link>
          </div> 
          : 
          <div className='bg-white fixed bottom-0 z-50 w-full dark:bg-gray-900 h-16 border-t border-t-slate-700/50 dark:border-t-slate-500/30 flex'>
            <Link className='flex-1 border-r border-r-slate-700/50 dark:border-r-slate-500/30 py-3 text-center flex justify-center text-blue-700 dark:text-purple-700'>
              <div className='w-full mx-auto'>
                <MdHome className='w-6 h-auto text-center' style={{ color: 'inherit', margin: '0 auto' }} />
                <span className='font-medium' style={{ fontSize: 12 }}>Accueil</span>
              </div>
            </Link>
            <Link to={"/fichiers"} className='flex-1 border-r border-r-slate-700/50 dark:border-r-slate-500/30 py-3 hover:bg-gray-200 hover:dark:bg-gray-800/40 text-center flex justify-center text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-purple-700'>
              <div className='w-full mx-auto'>
                <MdFolder className='w-6 h-auto text-center' style={{ color: 'inherit', margin: '0 auto' }} />
                <span className='font-medium' style={{ fontSize: 12 }}>Fichiers</span>
              </div>
            </Link>
            <Link to={"/partages"} className='flex-1 py-3 hover:bg-gray-200 hover:dark:bg-gray-800/40 text-center flex justify-center text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-purple-700'>
              <div className='w-full mx-auto'>
                <MdFolderShared className='w-6 h-auto text-center' style={{ color: 'inherit', margin: '0 auto' }} />
                <span className='font-medium' style={{ fontSize: 12 }}>Partagés</span>
              </div>
            </Link>
            <button
              onClick={async () => {
                const elementId = await HandleNewAdrenalia(userUID, userData.userName);
                navigate('/adrenalia/view?element=' + elementId);
              }}
              className='text-white dark:text-slate-300 bg-blue-700 dark:bg-purple-700 absolute right-3 z-10 bottom-1/2 transform -translate-y-11 px-4 py-2 rounded-full border-2 border-blue-700 dark:border-purple-700 flex items-center justify-center'
              style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
            >
              <MdAdd className='w-8 h-auto text-center' style={{ color: 'inherit' }} />
              <span className='mx-1 font-bold text-white dark:text-slate-300'>Créer</span>
            </button>
          </div>}

        <div className={`py-4 px-5 w-full ${isMobile === false && "border-t ml-16 border-t-slate-700/50 dark:border-t-slate-500/30"}`}>
          <div className="flex justify-between items-center mt-1 mb-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">Documents</h2>
          </div>
          <ul className="">
            {elements.length === 0 ? 
              <div class="flex items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2">
                <div role="status" class="flex items-center">
                  <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-700 dark:fill-purple-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Chargement...</span>
                </div>
              </div>
            :
              elements.map((element) => (
                <div key={element.id}
                  onClick={() => {isOpen === false && HandleOpen(navigate, element.data.type, element.id, userData.userName)}}
                  className="flex items-center w-full cursor-pointer hover:bg-white/40 hover:dark:bg-gray-800/40 bg-white dark:bg-gray-900/5 px-4 py-2 border-b border-b-slate-500/30"
                >
                  <img
                    src={SelectImage(element.data.type)}
                    alt="document logo"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex-grow max-w-full  overflow-hidden">
                    <p className="max-w-fit text-gray-800 dark:text-white text-left text-sm font-semibold">
                      {element.data.title}
                    </p>
                  </div>
                  <div className='ml-2 flex items-center w-2/6'>

                    <div className="flex-grow px-5">
                      <Avatar round size='30' name={element.data.lastEditionUser} textSizeRatio={3} />
                    </div>
                    {isMobile === false &&
                      <div className="flex-grow h-full mr-16">
                        <p className="text-gray-800 dark:text-white text-center text-sm font-semibold">
                          {DateTransform(element.data.date.toDate())}
                        </p>
                      </div>
                    }
                    <Popup
                      trigger={<button className="flex-none p-1 text-gray-500 hover:text-gray-700 flex items-center whitespace-nowrap">
                        <MdOutlineDriveFileRenameOutline />
                      </button>}
                      modal
                      nested
                      onOpen={() => {setInputValue(element.data.title); setIsOpen(true)}}
                      onClose={() => setIsOpen(false)}
                    >
                      {close => (
                        <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pb-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '600px', maxHeight: '85vh' }}>
                          <div className="mb-3 text-center text-xl py-3 font-bold text-black dark:text-white bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">Renommer l'objectif</div>
                          <div className="content mx-5 mt-4 text-justify">
                            <div>
                              <p className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Titre</p>
                            </div>
                            <div className='pt-1 pl-3'>
                            <input
                                name='title'
                                className="shadow-inner bg-white/20 dark:bg-gray-600/50 appearance-none border rounded w-full py-2 px-3 border-slate-700 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Entrer le nouveau titre ici"
                                value={inputValue} // Bind the input value to the state
                                onChange={handleInputChange} // Handle input changes
                              />
                            </div>
                          </div>
                          <div className="pt-4 flex justify-end mr-5">
                            <button className="bg-red-500 w-30 text-white font-bold py-2 px-4 rounded mr-5" onClick={() => {close()}}>Annuler</button>
                            <button className="bg-green-500 w-30 text-white font-bold py-2 px-4 rounded" onClick={() => {HandleRenameElement(element.id, inputValue, setElements, elements); close()}}>Sauvegarder</button>
                          </div>
                        </div>
                      )}
                    </Popup>

                    <Popup
                      trigger={<button className="flex-none p-1 text-red-500 hover:text-red-700 flex items-center whitespace-nowrap">
                        <MdDelete />
                      </button>}
                      modal
                      nested
                      onOpen={() => setIsOpen(true)}
                      onClose={() => setIsOpen(false)}
                    >
                      {close => (
                        
                        <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pb-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '600px', maxHeight: '85vh' }}>
                          <div className="mb-3 text-center text-xl py-3 font-bold text-black dark:text-white bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">Êtes-vous sûr de vouloir supprimer {element.data.title} ?</div>

                          <div className="pt-4 flex justify-end mr-5">
                            <div style={{margin: '0 auto'}}>
                                <button onClick={() => close()} className="bg-green-500 w-30 text-black dark:text-white font-bold py-2 px-4 rounded mr-5">Annuler</button>
                                <button onClick={() => {HandlleRemoveElement(element.id, elements, setElements); close()}} className="bg-red-500 w-30 text-black dark:text-white font-bold py-2 px-4 rounded">Confirmer</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Popup>
                    
                  </div>
                </div>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}

export default Home;