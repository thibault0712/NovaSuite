import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import {ref, getStorage, deleteObject } from "firebase/storage"
import { db } from '../../../../../data/firebase';

//Je n'utilise pas directement handleDeletImage car il va écrire 1 fois en plus car il update image à none
function getFileNameFromURL(url) {
  const decodedURL = decodeURIComponent(url);
  const startIndex = decodedURL.lastIndexOf('/') + 1;
  const endIndex = decodedURL.indexOf('?');
  const fileName = decodedURL.substring(startIndex, endIndex);
  return fileName;
}

export async function HandleDeletObjective (documentId, node, objective, lastObjective, setUpdate, objectives, element) {
    var deletedElements = 1;
    let lastObjectiveChildrens;
    const position = objective.position;
    await deleteDoc(doc(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives", objective.id));

    if (objective.image !== "none" && objective.image !== "treatment"){
      console.log("on remove")
      const fileName = getFileNameFromURL(objective.image);
      const storage = getStorage();
      const desertRef = ref(storage, 'images/' + fileName);
    
      deleteObject(desertRef).then(() => {
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
    }

    if (position >= 0){
      objectives?.length > 0 &&
      objectives[node.node - 1]?.filter(objective => objective.parents.length === 0)
        .sort((a, b) => a.position - b.position)
        .forEach(async objectiveMap => {
          if (objective.position < objectiveMap.position) {
            const changeObjectivePosition = doc(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives", objectiveMap.id);
            await updateDoc(changeObjectivePosition, {
              position: objectiveMap.position - 1
            });
          }
        });
    }

  if (lastObjective) {    //On vérifie si c'est le premier objectif ou non par le fait de si y a un objectif avant ou non
    lastObjectiveChildrens = lastObjective.childrens.filter(children => children !== objective.id);
    const objectiveRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives", lastObjective.id);
    await updateDoc(objectiveRef, {
      childrens: lastObjectiveChildrens
    });
  }
  
  async function removeChildrens(objective) {
    if (objective.childrens.length > 0) {
      await objective.childrens.map(async (children) => {
        deletedElements = deletedElements + 1;
        const docRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives", children);
        const docSnap = await getDoc(docRef);
        await removeChildrens(docSnap.data());
        await deleteDoc(docRef);
      });
    }
  }
  
  removeChildrens(objective);

  const NodeRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id);
  await updateDoc(NodeRef, {
    objectives: node.objectives - deletedElements
  });

  setUpdate(objective.id);
}