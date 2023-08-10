import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';

export async function GetOwnerInformation(setOwnerData, elementId){
    const docRef = doc(db, "elements", elementId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const ownerUID = docSnap.data().owner
      const ownerInfoRef = doc(db, "users", ownerUID);
      const ownerInfoSnap = await getDoc(ownerInfoRef);
        if (ownerInfoSnap.exists()){
            setOwnerData({...ownerInfoSnap.data(), uid: ownerUID});
        }else{
            console.error("Aucune information à propos du propriétaire du fichier")
        }
    } else {
      console.error("Impossible de trouver le propriétaire du fichier !");
    }
}