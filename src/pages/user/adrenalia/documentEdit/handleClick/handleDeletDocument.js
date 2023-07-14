import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';

export async function HandleDeletDocument (selectedDocument, setUpdate, documents, setSelectedDocument, nodes, objectives, element) {
  const docId = documents[selectedDocument].id;

  nodes.map(async(node) => {
    await deleteDoc(doc(db, "elements", element, "documents", documents[selectedDocument].id, "nodes", node.id));
    objectives[node.node -1].map(async (objective) => {
      await deleteDoc(doc(db, "elements", element, "documents", documents[selectedDocument].id, "nodes", node.id, "objectives", objective.id));
    })
  })

  await deleteDoc(doc(db, "elements", element, "documents", docId));
  documents.map(async (lastDocument) => {
        if (documents[selectedDocument].position < lastDocument.position){
            const positionRef = doc(db, "elements", element, "documents", lastDocument.id);
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