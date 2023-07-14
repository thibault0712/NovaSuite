import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';

export async function GetDocuments (element){
    try {
        const Documents = []; // Tableau temporaire pour stocker les titres des documents
        const querySnapshot = await getDocs(collection(db, "elements", element, "documents"));
        querySnapshot.forEach((document) => {
          Documents.push({ id: document.id, title: document.data().title, position: document.data().position });
        });
        const sortDocuments = [...Documents].sort((a, b) => a.position - b.position)
        return sortDocuments;
    } catch(error){
        return "error during getDocuments"
    }
}