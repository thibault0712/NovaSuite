import React from 'react';
import Popup from 'reactjs-popup';
import { handleSetMake } from '../handleClick/handleSetMake';
import { handleSetNotMake } from '../handleClick/handleSetNotMake';
import { MdCloudUpload } from "react-icons/md";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import './styles/popup.css'

export function PopupObjective(objective, documentId, node, setUpdate, make, lastObjective, blockedNodes, element) {
  return (
    <div className='relative flex items-center mb-16'>
      <Popup
        trigger={<button id={objective.id}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: 1.15,
          padding: 2
        }}
        className={`bg-gray-50 hover:bg-gray-50/80 dark:bg-gray-600 dark:hover:bg-gray-600/80 overflow-hidden text-xs h-9 text-black dark:text-white w-28 rounded mr-5 border-2 inline-flex items-center ${make === true ? "border-green-400" : lastObjective && lastObjective.make === true ? "border-orange-400" : "border-red-400"}`}>
            <span style={{margin: '0 auto'}}>{objective.title}</span>
          </button>}
        modal
        nested
      >
        {close => (
          <div className="modal bg-gray-50 dark:bg-gray-900 rounded-xl pb-4 mx-4 my-6 shadow-md overflow-y-auto scrollbar-thin scrollbar-track-slate-700/0 scrollbar-thumb-slate-900/50" style={{ width: '85vw', maxWidth: '600px', maxHeight: '85vh' }}>
            <div className="text-center text-xl py-3 font-bold text-black dark:text-white bg-gray-50 dark:bg-gray-900  sticky top-0 z-10">{objective.title}</div>
            {objective.image !== "none" && objective.image !== "treatment" &&
            <div className="content pb-3 mx-5 mt-4 text-justify">
              <div>
                <p className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Image</p>
              </div>
                <div className="pl-3">
                  <img src={objective.image} className='h-auto max-w-full shadow-inner rounded m-4' alt="..." style={{margin: "0 auto"}}></img>
                </div>
            </div>
            }
            {objective.image === "treatment" &&
              <div className="content mx-5 mt-4 text-justify">
                <div>
                  <p className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Image</p>
                </div>
                <div className='pl-3 m-4 bg-gray-600/50 border border-gray-500 text-center rounded text-black dark:text-white '>
                  <div className='mt-4 mb-2'><MdCloudUpload style={{margin: "0 auto"}} className="w-8 h-8"/></div>
                  <div className='pb-4'><p>En cours de traitement, si l'image n'apparait pas réactualiser la page</p></div>
                </div>
              </div>
            }
              <div className="content pb-3 mx-5 mt-4 text-justify">
                <div>
                  <p className='text-black dark:text-white text-sm tracking-wide font-medium mb-2'>Description</p>
                </div>
                <div className='shadow-inner bg-slate-300/40 dark:bg-gray-600/50 rounded p-3' style={{minHeight: 100}}>
                    <div className="prose prose-h1:text-center dark:prose-headings:text-white dark:prose-p:text-white dark:prose-a:text-white dark:prose-strong:text-white dark:prose-blockquote:text-white">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} className='dark:text-white'>{objective.content}</ReactMarkdown>
                    </div>
                </div>
              </div>
            <div className="pt-1 flex justify-end mr-5">
              {
                objective.make === true && 
                <button onClick={ async () => { await handleSetNotMake(objective.id, documentId, node, setUpdate, element); close()}} className="bg-red-700 hover:bg-red-600 w-30 text-white font-bold py-2 px-4 rounded">Bloquer</button>
                //await pour attendre que handleSetNotMake soit fini avant de close permet d'avoir une animation plus jolie
              }
              {
                objective.make === false && ((node &&  blockedNodes > node.node - 1 && !lastObjective) || (lastObjective && lastObjective.make === true)) &&
                  <button onClick={async () =>  { await handleSetMake(objective.id, documentId, node, setUpdate, element); close()}} className="bg-green-700 hover:bg-green-600 w-30 text-white font-bold py-2 px-4 rounded">Débloquer</button>
                  //await pour attendre que handleSetNotMake soit fini avant de close permet d'avoir une animation plus jolie
              }
              {
                objective.make === false && ((blockedNodes <= node.node - 1) || (lastObjective && lastObjective.make === false)) &&
                  <button className="bg-green-800/50 w-30 text-white font-bold py-2 px-4 rounded cursor-default Disabled">Débloquer</button>
              }
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}