import { doc, updateDoc } from 'firebase/firestore';
import {ref, getStorage, deleteObject } from "firebase/storage"
import { db } from '../../../../../data/firebase';

function getFileNameFromURL(url) {
  const decodedURL = decodeURIComponent(url);
  const startIndex = decodedURL.lastIndexOf('/') + 1;
  const endIndex = decodedURL.indexOf('?');
  const fileName = decodedURL.substring(startIndex, endIndex);
  return fileName;
}

export async function HandleDeletImage (documentId, node, objective, element) {
  const objectiveRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives", objective.id);
  await updateDoc(objectiveRef, {
    image: "none"
  });

  const fileName = getFileNameFromURL(objective.image);
  const storage = getStorage();
  const desertRef = ref(storage, 'images/' + fileName);

  deleteObject(desertRef).then(() => {
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
}