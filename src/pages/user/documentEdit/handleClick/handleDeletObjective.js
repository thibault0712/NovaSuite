import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../data/firebase';

export async function HandleDeletObjective (documentId, node, objective, lastObjective, setUpdate) {
    var deletedElements = 1;
  await deleteDoc(doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes", node.id, "objectives", objective.id));
  const lastObjectiveChildrens = lastObjective.childrens.filter(children => children !== objective.id)

  const objectiveRef = doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes", node.id, "objectives", lastObjective.id);
  await updateDoc(objectiveRef, {
    childrens: lastObjectiveChildrens
  });

  async function removeChildrens(objective) {
    if (objective.childrens.length > 0) {
      await objective.childrens.map(async (children) => {
        deletedElements = deletedElements + 1;
        const docRef = doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes", node.id, "objectives", children);
        const docSnap = await getDoc(docRef);
        await removeChildrens(docSnap.data());
        await deleteDoc(docRef);
      });
    }
  }
  
  removeChildrens(objective);

  const NodeRef = doc(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes", node.id);
  await updateDoc(NodeRef, {
    objectives: node.objectives - deletedElements
  });

  setUpdate(objective.id);
}