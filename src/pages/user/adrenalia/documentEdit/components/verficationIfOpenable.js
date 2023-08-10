import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../data/firebase";

export async function VerificationIfOpenable(element, userUID, navigate) {
  const docRef = doc(db, "elements", element);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.owner !== userUID && (!data.shared || !data.shared.includes(userUID))) {
      // Si l'userUID n'est ni le propriétaire, ni dans le tableau partagé
      navigate('/');
    } else {
      if (data.owner !== userUID && data.sharedProperties[userUID].permission !== "Editeur"){
        navigate("/adrenalia/view?element=" + element)
      }else{
        //Utilisateur autorisé
      }
    }
  } else {
    // Le document n'existe pas dans la collection
    navigate('/');
  }
}