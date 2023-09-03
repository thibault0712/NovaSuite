import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../data/firebase";

export async function HandleDragNode(element, node){  
    const nodeContent = {
        id: node.id,
        data: node.data,
        position: node.position,
        type: node.type,
      }

    await setDoc(doc(db, "elements", element), {
        nodes: {
          [node.id]: nodeContent
        }
    },
    {merge: true});
}