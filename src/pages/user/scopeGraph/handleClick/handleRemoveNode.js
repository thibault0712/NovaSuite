import { deleteField, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../data/firebase";

export async function HandleRemoveNode(element, node){  
    await setDoc(doc(db, "elements", element), {
        nodes: {
          [node.id]: deleteField()
        }
    },
    {merge: true});
}