import { collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../../data/firebase';
import {ref, getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export async function HandleNewObjective (documentId, node, objective, title, content, setUpdate, Path, newColonObjective) {
  var path = "none"
  if (Path){
    path= "treatment"
  }

  var parents;
  if (newColonObjective === true){
    parents = [];
  }else{
    parents = arrayUnion(objective.id);
  }

  const docRefDocument = await addDoc(collection(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes", node.id, "objectives"), {
      childrens: [],
      parents:  parents,
      title: title,
      content: content,
      id: "docRefDocument.id",
      make: false,
      image: path
    });
    const docId = docRefDocument.id

    const objectiveRef = doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes", node.id, "objectives", docId);
    await updateDoc(objectiveRef, {
      id: docId
    });
    
    const updatedChildrens = [...objective.childrens, docId]; // Ajout de l'élément au tableau en utilisant l'opérateur de propagation
    if (parents.length !== 0){
    const objectiveParentRef = doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes", node.id, "objectives", objective.id);
    await updateDoc(objectiveParentRef, {
      childrens: updatedChildrens
    });
  }

      const NodeRef = doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes", node.id);
      await updateDoc(NodeRef, {
        objectives: node.objectives + 1
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
            setUpdate(downloadURL); // On doit mettre à jour pour rendre l'image visible
          });
        }
      );
    }

    setUpdate(updatedChildrens);
  }