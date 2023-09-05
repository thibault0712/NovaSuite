import { doc, setDoc} from 'firebase/firestore';
import { db } from '../../../../data/firebase';

export async function handleUpdateLabel (element, labelUpdate, nodeId){
    await setDoc(doc(db, "elements", element), {
        nodes: {
          [nodeId]: {
            data: {
                label: labelUpdate
            }
          }
        }
      },
      {merge: true});
}