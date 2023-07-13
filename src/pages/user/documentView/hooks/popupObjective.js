import React from 'react';
import Popup from 'reactjs-popup';
import { handleSetMake } from '../handleClick/handleSetMake';
import { handleSetNotMake } from '../handleClick/handleSetNotMake';
import { MdCloudUpload } from "react-icons/md";
import './styles/popup.css'

export function PopupObjective(objective, documentId, node, setUpdate, make, lastObjective, blockedNodes) {
  return (
    <div className='relative flex items-center mb-16'>
      <Popup
        trigger={<button id={objective.id} className={`overflow-hidden bg-slate-500 hover:bg-slate-500/80 text-xs h-9 text-white w-28 rounded mr-5 border-2 inline-flex items-center ${make === true ? "border-green-400" : lastObjective && lastObjective.make === true ? "border-orange-400" : "border-red-400"}`}>
            {/* {
              objective.image !== "none" && 
              <img src={objective.image} style={{maxWidth: '50%'}} className='h-full w-auto object-cover rounded' alt="..."></img>
            } */}
            <span style={{margin: '0 auto'}}>{objective.title}</span>
          </button>}
        modal
        nested
      >
        {close => (
          <div className="modal bg-slate-700 rounded-xl pb-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '600px', maxHeight: '85vh' }}>
            <div className="text-center text-xl py-3 font-bold text-white bg-slate-700 sticky top-0 z-10">{objective.title}</div>
            {objective.image !== "none" && objective.image !== "treatment" &&
            <div className="content pb-3 mx-5 mt-4 text-justify">
              <div>
                <p className=' text-white text-sm tracking-wide font-medium mb-2'>Image</p>
              </div>
                <div className="pl-3">
                  <img src={objective.image} className='h-auto max-w-full shadow-inner rounded m-4' alt="..." style={{margin: "0 auto"}}></img>
                </div>
            </div>
            }
            {objective.image === "treatment" &&
              <div className="content mx-5 mt-4 text-justify">
                <div>
                  <p className=' text-white text-sm tracking-wide font-medium mb-2'>Image</p>
                </div>
                <div className='pl-3 m-4 bg-slate-600/50 border border-slate-500 text-center rounded text-white '>
                  <div className='mt-4 mb-2'><MdCloudUpload style={{margin: "0 auto"}} className="w-8 h-8"/></div>
                  <div className='pb-4'><p>En cours de traitement, si l'image n'apparait pas réactualiser la page</p></div>
                </div>
              </div>
            }
            <div className="content pb-3 mx-5 mt-4 text-justify">
              <div>
                <p className=' text-white text-sm tracking-wide font-medium mb-2'>Description</p>
              </div>
              <div className='shadow-inner bg-slate-600/50 rounded p-4' style={{minHeight: 100}}>
                <p className='text-white text-xs'>{objective.content}</p>
              </div>
            </div>
            <div className="pt-1 flex justify-end mr-5">
              {
                objective.make === true && 
                <button onClick={ async () => { await handleSetNotMake(objective.id, documentId, node, setUpdate); close()}} className="bg-red-700 hover:bg-red-600 w-30 text-white font-bold py-2 px-4 rounded">Bloquer</button>
                //await pour attendre que handleSetNotMake soit fini avant de close permet d'avoir une animation plus jolie
              }
              {
                objective.make === false && ((node && ( blockedNodes > node.node - 1)) || (lastObjective && lastObjective.make === true)) &&
                  <button onClick={async () =>  { await handleSetMake(objective.id, documentId, node, setUpdate); close()}} className="bg-green-700 hover:bg-green-600 w-30 text-white font-bold py-2 px-4 rounded">Débloquer</button>
                  //await pour attendre que handleSetNotMake soit fini avant de close permet d'avoir une animation plus jolie
              }
              {
                objective.make === false && ((blockedNodes <= node.node - 1) || (lastObjective && lastObjective.make === false)) &&
                  <button className="bg-green-800/50 w-30 text-white font-bold py-2 px-4 rounded cursor-default Disabled">Débloquer</button>
                  //await pour attendre que handleSetNotMake soit fini avant de close permet d'avoir une animation plus jolie
              }
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}