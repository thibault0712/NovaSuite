import { useEffect } from "react";
import { onSnapshot, query, collection } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';
import { useLocation } from "react-router-dom";


export function SynchronizationNodes(setNodes, selectedDocument, documents, setBlockedNodes){
    const location = useLocation();

    useEffect (() => {
        try{ //Try obligé car si on supprime un doc sur lequel l'utilisateur y est = erreur donc try affiche rien de selectionné
            if (documents){
                const documentId = documents[parseInt(selectedDocument)].id;
                const searchParams = new URLSearchParams(location.search);
                const element = searchParams.get('element');
                
                const queryNodes = query(collection(db, "elements", element, "documents", documentId, "nodes"));
                const unsubscribe = onSnapshot(queryNodes, (querySnapshot) => {
                    const nodes = [];
                    querySnapshot.forEach((node) => {
                        nodes.push({...node.data(), id: node.id});
                    });
                    const sortNodes = [...nodes].sort((a, b) => a.node - b.node);
                    setNodes(sortNodes)
    
    
                    var dataBlockedNode = 0;
                    sortNodes.map((node, key) => {
                      if (node.objectives !== node.resolvedObjectives && dataBlockedNode === 0) {
                        dataBlockedNode = key + 1;
                      }
                      return null;
                    });
                    setBlockedNodes(dataBlockedNode);
                });

                return () => unsubscribe();
            }

        }catch(e){
        }
    }, [location, setNodes, selectedDocument, documents, setBlockedNodes])
}