import { useEffect } from "react";
import { onSnapshot, query, doc } from 'firebase/firestore';
import { db } from '../../../../data/firebase';
import { useLocation } from "react-router-dom";

export async function SynchronizationEdges(setEdges){
  const location = useLocation();

  useEffect (() => {
      const searchParams = new URLSearchParams(location.search);
      const element = searchParams.get('element');

      const queryNodes = query(doc(db, "elements", element));
      const getEdges = onSnapshot(queryNodes, {edges: true}, (querySnapshotNodes) => {
          if (querySnapshotNodes.metadata.hasPendingWrites === false){
            setEdges(querySnapshotNodes.data().edges)
          }
      });
      return () => getEdges();
  }, [location, setEdges])
}