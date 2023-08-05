import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';

export async function HandleRenameDocument (selectedDocument, documents, title, element) {

    await updateDoc(doc(db, "elements", element, "documents", documents[selectedDocument].id), {
        title: title
    });

  }