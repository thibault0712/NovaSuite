import { doc, updateDoc } from 'firebase/firestore';
import {ref, getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { db } from '../../../../../data/firebase';

export async function HandleEditObjective (documentId, node, objective, title, content, Path, element) {
    var path = "none"
    if (Path){
      path = "treatment"
    }
    const objectiveRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives", objective.id);
    await updateDoc(objectiveRef, {
      title: title,
      content: content,
      image: path
    });

    if (Path) {
      const storage = getStorage();
      const timestamp = Date.now(); // Obtenir un horodatage unique
      const fileName = `${timestamp}_${Path.name}`; // Combinaison de l'horodatage et du nom de fichier
      const storageRef = ref(storage, "images/" + fileName);  
      const uploadTask = uploadBytesResumable(storageRef, Path);
      uploadTask.on(
        'state_changed', 
        (snapshot) => {
          // Gestion des mises à jour de progression
        }, 
        (error) => {
          // Gestion des erreurs
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(objectiveRef, {
              image: downloadURL
            });
          });
        }
      );
    }
  }