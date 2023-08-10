import { setDoc, arrayRemove, doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../../../../data/firebase";

export async function HandleChangePermission(permission, userUID, element, setUsersSharedData, usersSharedData){
    if (permission === "Expulser"){
        await updateDoc(doc(db, "elements", element), {
            shared: arrayRemove(userUID)
        });
  
        await setDoc(doc(db, "elements", element), {
            sharedProperties: {
                [userUID]: deleteField()
              }
        }, {merge: true});

        const updatedUsersSharedData = usersSharedData.filter(item => item.id !== userUID);
        setUsersSharedData(updatedUsersSharedData);
    }else{
      await setDoc(doc(db, "elements", element), {
        sharedProperties: {
          [userUID]: {
            permission: permission
          }
        }
      },
      {merge: true});
    }
}