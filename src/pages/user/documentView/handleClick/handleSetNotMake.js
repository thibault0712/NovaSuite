import {getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../data/firebase';
export async function handleSetNotMake(objectiveId, documentId, node, setUpdate) {
    const nodeRef = doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes", node.id);
    const nodeSnapshot = await getDoc(nodeRef);
    const currentResolvedObjectives = nodeSnapshot.data().resolvedObjectives || 0;
    const updatedResolvedObjectives = currentResolvedObjectives - 1;
  
    await updateDoc(nodeRef, {
      resolvedObjectives: updatedResolvedObjectives
    });
  
    const objectiveRef = doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes", node.id, "objectives", objectiveId);
    await updateDoc(objectiveRef, {
      make: false
    });
    setUpdate(updatedResolvedObjectives); //Je met cette valeur là car il faut une valeur qui change à chaque fois qu'on appuie sur le bouton poour forcer un update du useEffect
}