import { doc, updateDoc, arrayUnion} from 'firebase/firestore';
import { db } from '../../../../data/firebase';

export async function HandleNewEdges (element, newEdges){

    await updateDoc(doc(db, "elements", element), {
        edges: arrayUnion(newEdges)
      });
}