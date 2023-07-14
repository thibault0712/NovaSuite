import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../data/firebase";

export async function VerificationIfOpenable(element, userUID, navigate){
    const docRef = doc(db, "elements", element);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      if (docSnap.data().owner !== userUID){
        navigate('/')
      }
    } else {
        navigate('/')
    }
}