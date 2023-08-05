import { useEffect } from "react";
import { onSnapshot, query, collection } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';
import { useLocation } from "react-router-dom";

export function SynchronizationObjectives(selectedDocument, documents, objectives, setObjectives) {
  const location = useLocation();

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const documentId = documents[parseInt(selectedDocument)].id;
        const searchParams = new URLSearchParams(location.search);
        const element = searchParams.get('element');
        const objectivesUpdate = [...objectives];
        const queryNodes = query(collection(db, "elements", element, "documents", documentId, "nodes"));
        const unsubscribeNodes = onSnapshot(queryNodes, async (querySnapshot) => {
          const unsubscribeObjectivesArray = [];

          querySnapshot.docChanges().forEach(async (change) => {
            if (change.type !== "removed") {
              const nodeId = change.doc.id;
              const node = change.doc.data();

              const q = query(collection(db, "elements", element, "documents", documentId, "nodes", nodeId, "objectives"));
              const unsubscribeObjectives = onSnapshot(q, (querySnapshot) => {
                const objectivesData = [];
                querySnapshot.forEach((objective) => {
                  objectivesData.push({ ...objective.data(), id: objective.id });
                });
                objectivesUpdate[node.node - 1] = objectivesData;
                setObjectives([...objectivesUpdate]); // Update objectives with fresh data
              });

              unsubscribeObjectivesArray.push(unsubscribeObjectives);
            }
          });

          // Clean up all objectives subscriptions
          const cleanupAllObjectivesSubscriptions = () => {
            unsubscribeObjectivesArray.forEach(unsubscribe => unsubscribe());
          };

          // Add the cleanup function to unsubscribe the nodes listener when the component unmounts
          return () => {
            cleanupAllObjectivesSubscriptions();
            unsubscribeNodes();
          };
        });
      } catch (e) {
      }
    };

    fetchObjectives();

    // eslint-disable-next-line
  }, [location, selectedDocument, documents, setObjectives]);
}
