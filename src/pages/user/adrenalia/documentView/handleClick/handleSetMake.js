import {getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';
export async function handleSetMake(objectiveId, documentId, node, element) {
  const nodeRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id);
    const nodeSnapshot = await getDoc(nodeRef);
    const currentResolvedObjectives = nodeSnapshot.data().resolvedObjectives || 0;
    const updatedResolvedObjectives = currentResolvedObjectives + 1;
  
    const objectiveRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives", objectiveId);
    await updateDoc(objectiveRef, {
      make: true
    });

    await updateDoc(nodeRef, {
      resolvedObjectives: updatedResolvedObjectives
    });
}