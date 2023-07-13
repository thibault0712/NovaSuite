import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../data/firebase';

export async function HandleRenameDocument (selectedDocument, setUpdate, documents, title) {

    await updateDoc(doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documents[selectedDocument].id), {
        title: title
    });

    setUpdate(documents[selectedDocument].id + title); //+ title car on est pas sur d'avoir un update avec juste l'id du document si on rename deux fois sur le même
  }