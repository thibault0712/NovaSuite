import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../data/firebase";

export async function GetElementsInformations(setElements, userUID){
    const q = query(collection(db, "elements"), where("owner", "==", userUID));
    const elements = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      elements.push({ data: doc.data(), id: doc.id });
    });
    elements.sort((a, b) => b.data.date.toDate() - a.data.date.toDate());
    setElements(await Promise.all(elements));
}