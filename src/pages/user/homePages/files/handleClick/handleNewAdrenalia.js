import { collection, doc, addDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../../../../../data/firebase";
import { serverTimestamp } from 'firebase/firestore';

export async function HandleNewAdrenalia(userUID, userName){
    // Add a new document with a generated id.
    const elementRef = await addDoc(collection(db, "elements"), {
        type: "Adrenalia",
        title: "Adrenalia",
        owner: userUID,
        date: serverTimestamp(),
        lastEditionUser: userName,
        shared: []
    });
    const elementId = elementRef.id

    const documentRef = await addDoc(collection(db, "elements", elementId, "documents"), {
        position: 1,
        title: "Document 1"
    });
    const documentId = documentRef.id

    const nodeRef = await addDoc(collection(db, "elements", elementId, "documents", documentId, "nodes"), {
        node: 1,
        objectives: 1,
        resolvedObjectives: 0
    });
    const nodeId = nodeRef.id

    const objectiveRef = await addDoc(collection(db, "elements", elementId, "documents", documentId, "nodes", nodeId, "objectives"), {
        childrens: [],
        content: "Ceci est votre premier objectif !",
        image: "none",
        make: false,
        parents: [],
        title: "Premier objectif",
        position: 1
    });
    const objectiveId = objectiveRef.id

    await updateDoc(doc(db, "elements", elementId, "documents", documentId, "nodes", nodeId, "objectives", objectiveId), {
        id: objectiveId
    });

    return elementId;
}