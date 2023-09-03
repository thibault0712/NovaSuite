import { doc, setDoc} from 'firebase/firestore';
import { db } from '../../../../data/firebase';

export async function HandleNewNode (element, newNode){
    const nodeContent = {
      id: newNode.id,
      data: newNode.data,
      position: newNode.position,
      type: newNode.type,
    }
    await setDoc(doc(db, "elements", element), {
        nodes: {
          [newNode.id]: nodeContent
        }
      },
      {merge: true});
}