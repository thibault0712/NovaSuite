import { collection, addDoc, doc, updateDoc} from 'firebase/firestore';
import { db } from '../../../../data/firebase';

export async function HandleNewDocument (documents, setDocuments, selectedDocument, setSelectedDocument, setUpdate){
    const newDocumentNumber = documents.length + 1
    const docRefDocument = await addDoc(collection(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents"), {
      title: "Document " + (newDocumentNumber - 1), //-1 car il y a un décalage entre le titre et la position
      position: newDocumentNumber,
    });
    const docId = docRefDocument.id
    setDocuments(current => [...current, { id: docId, title: "Document " + newDocumentNumber }]);

    const docRefNode = await addDoc(collection(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", docId, "nodes"), {
      node: 1,
      objectives: 1,
      resolvedObjectives: 0,
    });
    const docNodeId = docRefNode.id
    

    const docRefObjective = await addDoc(collection(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", docId, "nodes", docNodeId, "objectives"), {
        childrens: [],
        parents:  [],
        title: "Objective",
        content: "Ceci est le premier objective",
        id: "docRefDocument.id",
        make: false,
        image: 'none'
      });
      const docObjectiveId = docRefObjective.id
  
      await updateDoc(doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", docId, "nodes", docNodeId, "objectives", docObjectiveId), {
        id: docObjectiveId
      });

    setSelectedDocument(newDocumentNumber - 1);
    setUpdate(docObjectiveId);
  }