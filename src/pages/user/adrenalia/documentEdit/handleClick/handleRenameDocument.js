import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';

export async function HandleRenameDocument (selectedDocument, setUpdate, documents, title, element) {

    await updateDoc(doc(db, "elements", element, "documents", documents[selectedDocument].id), {
        title: title
    });

    setUpdate(documents[selectedDocument].id + title); //+ title car on est pas sur d'avoir un update avec juste l'id du document si on rename deux fois sur le même
  }