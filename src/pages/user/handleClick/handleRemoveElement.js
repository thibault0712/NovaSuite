import { db } from "../../../data/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export async function HandlleRemoveElement(element, elements, setElements){
    await deleteDoc(doc(db, "elements", element));

    setElements(elements.filter(elementInTable => elementInTable.id !== element));
}