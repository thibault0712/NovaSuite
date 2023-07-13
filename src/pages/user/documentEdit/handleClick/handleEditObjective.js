import { doc, updateDoc } from 'firebase/firestore';
import {ref, getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { db } from '../../../../data/firebase';

export async function HandleEditObjective (documentId, node, objective, title, content, setUpdate, Path) {
    var path = "none"
    if (Path){
      path = "treatment"
    }
    const objectiveRef = doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes", node.id, "objectives", objective.id);
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
            console.log('File available at', downloadURL);
            await updateDoc(objectiveRef, {
              image: downloadURL
            });
            setUpdate(downloadURL); // On doit mettre à jour pour rendre l'image visible
          });
        }
      );
    }

    setUpdate(title + content);
  }