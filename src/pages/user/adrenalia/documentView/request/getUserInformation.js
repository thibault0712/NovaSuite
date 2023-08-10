import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';

export async function GetUseInformation(setUserData, userUID, element){
    const userRef = doc(db, "users", userUID);
    const userSnap = await getDoc(userRef);

    const docRef = doc(db, "elements", element);
    const docSnap = await getDoc(docRef);
    
    if (userSnap.exists()) {
      const userInfo = userSnap.data()
      if (docSnap.exists()){
        if (docSnap.data().sharedProperties[userUID]){
          const userPermission = docSnap.data().sharedProperties[userUID].permission
          setUserData({...userInfo, uid: userUID, permission: userPermission});
        }else{
          setUserData({...userInfo, uid: userUID, permission: "Propriétaire"});
        }
      }else{
        setUserData({...userInfo, uid: userUID, permission: "Propriétaire"}); 
        //Certains documents n'ont pas encore fait de partages et donc document non disponible et un utilisateur donc = Propriétaire
      }
    } else {
      setUserData({userName: ''})
      console.error("Aucune information à propos de l'utilisateur trouvé !");
    }
}