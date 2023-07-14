import { collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';
import {ref, getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export async function HandleNewObjective (documentId, node, objective, title, content, setUpdate, Path, element, position, objectives) {
  var path = "none"
  if (Path){
    path= "treatment"
  }

  console.log(position)

  var parents;
  if (position >= 0){
    parents = [];
    objectives?.length > 0 &&
    objectives[node.node - 1]?.filter(objective => objective.parents.length === 0)
      .sort((a, b) => a.position - b.position)
      .forEach(async objectiveMap => {
        if (objective.position < objectiveMap.position) {
          const changeObjectivePosition = doc(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives", objectiveMap.id);
          await updateDoc(changeObjectivePosition, {
            position: objectiveMap.position + 1
          });
        }
      });
  }else{
    parents = arrayUnion(objective.id);
  }

  const docRefDocument = await addDoc(collection(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives"), {
      childrens: [],
      parents:  parents,
      title: title,
      content: content,
      id: "docRefDocument.id",
      make: false,
      image: path
    });
    const docId = docRefDocument.id
    
    const objectiveRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives", docId);
    if (parents.length !== 0){
      await updateDoc(objectiveRef, {
        id: docId,
      });
    }else{
      await updateDoc(objectiveRef, {
        id: docId,
        position: objective.position + 1
      });
    }

    
    const updatedChildrens = [...objective.childrens, docId]; // Ajout de l'élément au tableau en utilisant l'opérateur de propagation
    if (parents.length !== 0){
    const objectiveParentRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id, "objectives", objective.id);
    await updateDoc(objectiveParentRef, {
      childrens: updatedChildrens
    });
  }

      const NodeRef = doc(db, "elements", element, "documents", documentId, "nodes", node.id);
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