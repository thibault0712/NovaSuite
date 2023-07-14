import { collection, addDoc, doc, updateDoc} from 'firebase/firestore';
import { db } from '../../../../../data/firebase';

export async function HandleNewNode (selectedDocument, node, setUpdate, documents, nodes, element) {

  const docRefNode = await addDoc(collection(db, "elements", element, "documents", documents[selectedDocument].id, "nodes"), {
      node: node + 2, //Dans mes nodes je commence à 1 donc +2
      objectives: 1,
      resolvedObjectives: 0
    });
    const nodeId = docRefNode.id
    
    const docRefDocument = await addDoc(collection(db, "elements", element, "documents", documents[selectedDocument].id, "nodes", nodeId, "objectives"), {
      childrens: [],
      parents:  [],
      title: "Objective",
      content: "Ceci est le premier objective",
      id: "docRefDocument.id",
      make: false,
      image: 'none',
      position: 1
    });
    const docId = docRefDocument.id

    const objectiveRef = doc(db, "elements", element, "documents", documents[selectedDocument].id, "nodes", nodeId, "objectives", docId);
    await updateDoc(objectiveRef, {
      id: docId
    });

    nodes.map(async (lastNode) => {
      console.log(node + 1, "<", lastNode.node)
      if (node + 1 < lastNode.node){
        const objectiveRef = doc(db, "elements", element, "documents", documents[selectedDocument].id, "nodes", lastNode.id);
        await updateDoc(objectiveRef, {
          node: lastNode.node + 1
        });
      }
    })

    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

    setUpdate(nodeId);
  }