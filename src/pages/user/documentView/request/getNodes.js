import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../../data/firebase';

export async function GetNodes (documentId){
    try {
        const Documents = []; // Tableau temporaire pour stocker les titres des documents
        const querySnapshot = await getDocs(collection(db, "users", "jl0PwRe1B1jpkSNx8FKh", "documents", documentId, "nodes"));
        querySnapshot.forEach((document) => {
          Documents.push({ id: document.id, objectives: document.data().objectives, resolvedObjectives: document.data().resolvedObjectives, node: document.data().node });
        });
        return(Documents); // Mettre à jour le state documents avec le tableau de titres
      } catch (error) {
        console.error('Erreur lors de la récupération des noeuds : ', error);
        return(null)
      }
}