import { db } from "../../../../../data/firebase";
import { serverTimestamp } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore"; 

export async function HandleOpen(navigate, type, elementId, userName){
    if (type === 'Adrenalia'){
        navigate ('/Adrenalia/view?element=' + elementId)
        await updateDoc(doc(db, "elements", elementId), {
            date: serverTimestamp(),
            lastEditionUser: userName
        });
    }else if(type === "ScopeGraph"){
        navigate ('/ScopeGraph?element=' + elementId)
        await updateDoc(doc(db, "elements", elementId), {
            date: serverTimestamp(),
            lastEditionUser: userName
        });
    }else{
        navigate ('/')
    }
}