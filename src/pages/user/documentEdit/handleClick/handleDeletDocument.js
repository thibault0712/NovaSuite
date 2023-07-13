import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../data/firebase';

export async function HandleDeletDocument (selectedDocument, setUpdate, documents, setSelectedDocument) {
  const docId = documents[selectedDocument].id;
  await deleteDoc(doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", docId));

  documents.map(async (lastDocument) => {
        if (documents[selectedDocument].position < lastDocument.position){
            const positionRef = doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", lastDocument.id);
            await updateDoc(positionRef, {
              position: lastDocument.position - 1
            });
        }
  })

   if (documents.length - 1 === selectedDocument){
    setSelectedDocument(selectedDocument - 1)
   }
   setUpdate(docId);
}