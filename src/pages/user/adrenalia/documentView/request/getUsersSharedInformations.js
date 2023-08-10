import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';

export async function GetUsersSharedInformations(elementId){
    const docRef = doc(db, "elements", elementId);
    const docSnap = await getDoc(docRef);
    const usersData = [];
    
    if (docSnap.exists()) {
      const usersInfo = docSnap.data().sharedProperties;
      
      for (const key in usersInfo) {
        if (usersInfo.hasOwnProperty(key)) {
          const user = usersInfo[key];
          const userInfoRef = doc(db, "users", key);
          const userInfoSnap = await getDoc(userInfoRef);
          usersData.push({id: key, permission: user.permission, ...userInfoSnap.data()})
        }
      }
      return(usersData)

    } else {
      console.error("Impossible de trouver les informations sur les utilisateurs !");
    }
}