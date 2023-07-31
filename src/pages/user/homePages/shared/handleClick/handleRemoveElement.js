import { db } from "../../../../../data/firebase";
import { doc, updateDoc,  getDoc} from "firebase/firestore";

export async function HandlleRemoveElement(element, elements, setElements, userUID){
    const elementInfo = await getDoc(doc(db, "elements", element));
    const sharedArray = elementInfo.data().shared;
    const updatedSharedArray = sharedArray.filter((uid) => uid !== userUID);

    await updateDoc(doc(db, "elements", element), { shared: updatedSharedArray });

    setElements(elements.filter(elementInTable => elementInTable.id !== element));
}