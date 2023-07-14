import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';

export async function GetUserInformation(setUserData, userUID){
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      setUserData({userName: ''})
      console.error("Aucune information à propos de l'utilisateur trouvé !");
    }
}