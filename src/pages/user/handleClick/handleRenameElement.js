import { db } from "../../../data/firebase";
import {doc, updateDoc} from "firebase/firestore";

export async function HandleRenameElement(elementId, title, setElements, elements) {
    await updateDoc(doc(db, "elements", elementId), {
        title: title
    });

    const updatedElements = elements.map((element) => {
        if (element.id === elementId) {
          return {
            ...element,
            data: {
              ...element.data,
              title: title
            }
          };
        }
        return element;
    });

    setElements(updatedElements);


}