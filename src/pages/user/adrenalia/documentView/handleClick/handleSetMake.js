import {getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';
export async function handleSetMake(objectiveId, documentId, node, setUpdate, element) {
    const nodeRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id);
    const nodeSnapshot = await getDoc(nodeRef);
    const currentResolvedObjectives = nodeSnapshot.data().resolvedObjectives || 0;
    const updatedResolvedObjectives = currentResolvedObjectives + 1;
  
    await updateDoc(nodeRef, {
      resolvedObjectives: updatedResolvedObjectives
    });
  
    const objectiveRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives", objectiveId);
    await updateDoc(objectiveRef, {
      make: true
    });
    setUpdate(updatedResolvedObjectives); //Je met cette valeur là car il faut une valeur qui change à chaque fois qu'on appuie sur le bouton poour forcer un update du useEffect
}