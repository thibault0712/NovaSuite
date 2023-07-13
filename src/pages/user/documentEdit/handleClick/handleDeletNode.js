import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../data/firebase';

export async function HandleDeletNode (selectedDocument, node, setUpdate, documents, nodes, objectives) {
  await deleteDoc(doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documents[selectedDocument].id, "nodes", node.id));

  objectives[node.node -1].map(async (objective) => {
     await deleteDoc(doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documents[selectedDocument].id, "nodes", node.id, "objectives", objective.id));
  })

  nodes.map(async (lastNode) => {
    if (node.node < lastNode.node){
      const objectiveRef = doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documents[selectedDocument].id, "nodes", lastNode.id);
      await updateDoc(objectiveRef, {
        node: lastNode.node - 1
      });
    }
  })

  setUpdate(node.id);
}