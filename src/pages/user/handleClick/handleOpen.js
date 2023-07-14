import { db } from "../../../data/firebase";
import { serverTimestamp } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore"; 

export async function HandleOpen(navigate, type, elementId){
    if (type === 'Adrenalia'){
        navigate ('/Adrenalia/view?element=' + elementId)
        await updateDoc(doc(db, "elements", elementId), {
            date: serverTimestamp()
        });
    }else{
        navigate ('/')
    }
}