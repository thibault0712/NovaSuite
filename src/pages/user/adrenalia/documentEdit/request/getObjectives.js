import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';

export async function GetObjectives(docId, sortedNodes, element) {
  try {
    const objectivesArray = await Promise.all(sortedNodes.map(async (nodeDoc) => {
      const nodeId = nodeDoc.id;
      const objectivesQuerySnapshot = await getDocs(collection(db, "elements", element, "documents", docId, "nodes", nodeId, "objectives"));

      return objectivesQuerySnapshot.docs.map((objectiveDoc) => ({
        ...objectiveDoc.data(),
        id: objectiveDoc.id
      }));
    }));
    return objectivesArray;
  } catch (error) {
    console.error('Error during the recuperation of objectives: ', error);
    return null;
  }
}
