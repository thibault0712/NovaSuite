import React from 'react';
import Popup from 'reactjs-popup';
import { MdAdd } from 'react-icons/md'
import { HandleNewObjective } from '../handleClick/handleNewObjective';
import { HandleDeletObjective } from '../handleClick/handleDeletObjective'
import { HandleEditObjective } from '../handleClick/handleEditObjective';
import { HandleDeletImage } from "../handleClick/handleDeletImage";
import './styles/popup.css'
import { MdCloudUpload, MdDelete } from "react-icons/md";



export function PopupObjective(objective, documentId, node, setUpdate, make, lastObjective, objectives, formData, setFormData, element) {
  var File;
  const handleChange = (e) => {
    if (e.target.name === "title" && e.target.value.length <= 31){
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (e.target.name === "content"){
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleEditPopupOpen = () => {
    setFormData({title: objective.title, content: objective.content}); // Réinitialise formData lorsque la popup d'édition est ouverte
  };

  const handleCreatePopupOpen = () => {
    setFormData({title: '', content: ''}); // Réinitialise formData lorsque la popup d'édition est ouverte
  };

  const handleChangeImage = (event) => {
    File = event.target.files[0];
}

  return (
  <div className='relative items-center mb-16'>
    <div style={{ display: "flex", alignItems: "center" }}>
    <Popup
      trigger={<button id={objective.id} 
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        lineHeight: 1.15,
        padding: 2,
      }}
      className={`overflow-hidden p-1 bg-gray-50 hover:bg-gray-50/80 dark:bg-gray-600 dark:hover:bg-gray-600/80 w-28 text-xs h-9 text-black dark:text-white rounded mr-2 border-2 inline-flex items-center ${make === true ? "border-green-400" : lastObjective && lastObjective.make === true ? "border-orange-400" : "border-red-400"}`} onClick={handleEditPopupOpen}>
                <span style={{margin: '0 auto'}}>{objective.title}</span>
              </button>}
      modal
      nested
      onOpen={() => handleEditPopupOpen()}
    >
      { close => (
        
        <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pb-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '600px', maxHeight: '85vh' }}>
          <div className="mb-3 text-center text-xl py-3 font-bold text-black dark:text-white bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">Editer un objectif</div>
          <div className="content mx-5 mt-4 text-justify">
            <div>
              <p className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Titre</p>
            </div>
            <div className='pt-1 pl-3'>
              <input name='title' value={formData.title} onChange={handleChange} className="shadow-inner bg-white/20 dark:bg-gray-600/50 appearance-none border rounded w-full py-2 px-3 border-slate-700 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Utiliser Adrénalia"></input>
            </div>
          </div>
          {objective.image === "none" &&
            <div className="content mx-5 mt-4 text-justify">
              <div>
                <p className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Image</p>
              </div>
              <div className='pt-1 pl-3'>
                <input onChange={handleChangeImage} accept="image/*" className="file:py-2 file:text-dark dark:file:text-gray-300 file:px-2 file:bg-slate-200 dark:file:bg-slate-600 text-slate-500 dark:text-white dark:focus:text-gray-400 file:border-none block w-full text-sm border rounded-lg cursor-pointer focus:outline-none bg-white/20 dark:bg-gray-600/50 border-gray-600 placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"></input>
              </div>
          </div>
          }
          {objective.image !== "none" && objective.image !== "treatment" &&
            <div className="content pb-3 mx-5 mt-4 text-justify">
              <div className='flex mb-2'>
                <p className=' text-black dark:text-white text-sm tracking-wide font-medium'>Image</p>
                <button className='ml-2'onClick={() => HandleDeletImage(documentId, node, objective, setUpdate, element)} ><MdDelete className='text-red-500 h-full w-auto'/></button>
              </div>
                <div className="pl-3">
                  <img src={objective.image} className='h-auto max-w-full shadow-inner rounded m-4' alt="..." style={{margin: "0 auto"}}></img>
                </div>
            </div>
          }
          {objective.image === "treatment" &&
            <div className="content mx-5 mt-4 text-justify">
              <div>
                <p className=' text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Image</p>
              </div>
              <div className="ml-4"> 
                <div style={{margin: "0 auto"}} className='pl-3 mt-4 w-full bg-white/20 dark:bg-gray-600/50 border border-slate-500 text-center rounded text-black dark:text-white '>
                  <div className='mt-4 mb-2'><MdCloudUpload style={{margin: "0 auto"}} className="w-8 h-8"/></div>
                  <div className='pb-4'><p>En cours de traitement, ne pas réactualiser la page</p></div>
                </div>
              </div>
            </div>
          }
          <div className="content pb-1 mx-5 text-justify mt-8">
            <div>
              <p className=' text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Description</p>
            </div>
            <div className='pt-1 pl-3'>
              <textarea name='content' value={formData.content} onChange={handleChange} className="shadow-inner resize-y bg-white/20 dark:bg-gray-600/50 appearance-none border border-slate-700 rounded w-full py-2 px-3 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline h-48" id="username" type="text" placeholder="Utiliser plus souvent Adrénalia pour être plus organisé !"></textarea>
            </div>
          </div>
          <div className="pt-1 flex justify-end mr-5">

            {(objective.parents.length !== 0 || objectives[node.node -1]?.filter(objective => objective.parents.length === 0).length > 1) &&
              <button onClick={ async () => {HandleDeletObjective(documentId, node, objective, lastObjective, setUpdate, objectives, element)}} className="bg-red-700 hover:bg-red-600 w-30 text-white font-bold py-2 px-4 rounded mr-5"> Supprimer </button>
            }
            <button onClick={ async () => {await HandleEditObjective(documentId, node, objective, formData.title, formData.content, setUpdate, File, element); close()}} className="bg-green-700 hover:bg-green-600 w-30 text-white font-bold py-2 px-4 rounded">Sauvegarder</button>
          </div>
        </div>
      )}
    </Popup>

    {objective.parents.length === 0 && 
      <Popup
          trigger={<button className='rounded-full py-1 px-1 bg-white hover:bg-white/80 dark:bg-gray-800 dark:hover:bg-gray-800/80 mr-3'><MdAdd className='text-black dark:text-white'/></button>}
          modal
          nested
          onOpen={() => handleCreatePopupOpen()}
        >
          {close => (
            
            <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pb-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '600px', maxHeight: '85vh' }}>
              <div className="mb-3 text-center text-xl py-3 font-bold text-black dark:text-white bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">Ajouter un nouvel objectif</div>
              <div className="content mx-5 mt-4 text-justify">
                <div>
                  <p className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Titre</p>
                </div>
                <div className='pt-1 pl-3'>
                  <input name='title' value={formData.title} onChange={handleChange} className="shadow-inner bg-white/20 dark:bg-gray-600/50 appearance-none border rounded w-full py-2 px-3 border-slate-700 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Utiliser Adrénalia"></input>
                </div>
              </div>
              <div className="content mx-5 mt-4 text-justify">
                <div>
                  <p className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Image</p>
                </div>
                <div className='pt-1 pl-3'>
                  <input onChange={handleChangeImage} accept="image/*" className="file:py-2 file:text-dark dark:file:text-gray-300 file:px-2 file:bg-slate-200 dark:file:bg-slate-600 text-slate-500 dark:text-white dark:focus:text-gray-400 file:border-none block w-full text-sm border rounded-lg cursor-pointer focus:outline-none bg-white/20 dark:bg-gray-600/50 border-gray-600 placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"></input>
                </div>
              </div>
              <div className="content pb-1 mx-5 text-justify mt-8">
                <div>
                  <p className=' text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Description</p>
                </div>
                <div className='pt-1 pl-3'>
                  <textarea name='content' value={formData.content} onChange={handleChange} className="shadow-inner resize-y bg-white/20 dark:bg-gray-600/50 appearance-none border border-slate-700 rounded w-full py-2 px-3 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline h-48" id="username" type="text" placeholder="Utiliser plus souvent Adrénalia pour être plus organisé !"></textarea>
                </div>
              </div>
              <div className="pt-4 flex justify-end mr-5">
                <button onClick={async() => {await HandleNewObjective(documentId, node, objective, formData.title, formData.content, setUpdate, File, element, objective.position, objectives); close()}} className="bg-green-500 w-30 text-white font-bold py-2 px-4 rounded">Créer</button>
              </div>
            </div>
          )}
        </Popup>
      }
      </div>
    <div style={{marginTop: 3}} className='absolute z-40 ml-11'>
      <Popup
        trigger={<button className='rounded-full py-1 px-1 bg-white hover:bg-gray-50/80 dark:bg-gray-800 dark:hover:bg-gray-800/80 mr-3'><MdAdd className='text-black dark:text-white'/></button>}
        modal
        nested
        onOpen={() => handleCreatePopupOpen()}
      >
        {close => (
          
          <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pb-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '600px', maxHeight: '85vh' }}>
            <div className="mb-3 text-center text-xl py-3 font-bold text-black dark:text-white bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">Ajouter un nouvel objectif</div>
            <div className="content mx-5 mt-4 text-justify">
              <div>
                <p className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Titre</p>
              </div>
              <div className='pt-1 pl-3'>
                <input name='title' value={formData.title} onChange={handleChange} className="shadow-inner bg-white/20 dark:bg-gray-600/50 appearance-none border rounded w-full py-2 px-3 border-slate-700 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Utiliser Adrénalia"></input>
              </div>
            </div>
            <div className="content mx-5 mt-4 text-justify">
              <div>
                <p className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Image</p>
              </div>
              <div className='pt-1 pl-3'>
                <input onChange={handleChangeImage} accept="image/*" className="file:py-2 file:text-dark dark:file:text-gray-300 file:px-2 file:bg-slate-200 dark:file:bg-slate-600 text-slate-500 dark:text-white dark:focus:text-gray-400 file:border-none block w-full text-sm border rounded-lg cursor-pointer focus:outline-none bg-white/20 dark:bg-gray-600/50 border-gray-600 placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"></input>
              </div>
            </div>
            <div className="content pb-1 mx-5 text-justify mt-8">
              <div>
                <p className=' text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Description</p>
              </div>
              <div className='pt-1 pl-3'>
                <textarea name='content' value={formData.content} onChange={handleChange} className="shadow-inner resize-y bg-white/20 dark:bg-gray-600/50 appearance-none border border-slate-700 rounded w-full py-2 px-3 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline h-48" id="username" type="text" placeholder="Utiliser plus souvent Adrénalia pour être plus organisé !"></textarea>
              </div>
            </div>
            <div className="pt-4 flex justify-end mr-5">
              <button onClick={async() => {await HandleNewObjective(documentId, node, objective, formData.title, formData.content, setUpdate, File, element); close()}} className="bg-green-500 w-30 text-white font-bold py-2 px-4 rounded">Créer</button>
            </div>
          </div>
        )}
      </Popup>
    </div>

  </div>
  );
}