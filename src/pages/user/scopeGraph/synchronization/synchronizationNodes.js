import { useEffect } from "react";
import { onSnapshot, query, doc } from 'firebase/firestore';
import { db } from '../../../../data/firebase';
import { useLocation } from "react-router-dom";

export async function GetNodes(setNodes){
  const location = useLocation();

  useEffect (() => {
      const searchParams = new URLSearchParams(location.search);
      const element = searchParams.get('element');
      var nodes = [];

      const queryNodes = query(doc(db, "elements", element));
      const getNodes = onSnapshot(queryNodes, {nodes: true}, (querySnapshotNodes) => {
          if (querySnapshotNodes.metadata.hasPendingWrites === false){
            nodes = []
            for (const key in querySnapshotNodes.data().nodes) {
                nodes.push(querySnapshotNodes.data().nodes[key])
            }
            nodes.sort((a, b) => a.id - b.id);
            console.log(nodes)
            setNodes(nodes)
          }
      });
      return () => getNodes();
  }, [location, setNodes])
}