import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../../../data/firebase";

export async function HandleRemoveEdges(element, edges){  
    edges.map(async (edge) => {
        const edgeInDataBase = {target: edge.target, id: edge.id, source: edge.source}
        await updateDoc(doc(db, "elements", element), {
            edges: arrayRemove(edgeInDataBase)
        });
    })
}