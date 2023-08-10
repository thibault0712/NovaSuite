import { setDoc, updateDoc, doc, query, collection, where, getDocs, arrayUnion } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';
import { getAuth } from 'firebase/auth';

export async function handleShareNewEmail(element, sharedUserEmail, sharedUserPermission, setSharedError, setShowSuccessNotif, usersSharedData, setUsersSharedData) {
  const auth = getAuth();
  const currentUserUID = auth.currentUser.uid;

  const q = query(collection(db, "users"), where("email", "==", sharedUserEmail));
  const querySnapshot = await getDocs(q);

  // Vérifier si un utilisateur a été trouvé avec l'adresse e-mail donnée
  if (querySnapshot.size === 1) {
    const sharedUserData = querySnapshot.docs[0].data();
    const sharedUserUID = querySnapshot.docs[0].id;

    // Vérifier si l'UID de l'utilisateur connecté correspond à l'UID récupéré à partir de l'adresse e-mail
    if (currentUserUID === sharedUserUID) {
      setSharedError("Vous ne pouvez pas partager un document avec vous-même");
      return;
    }

    if (usersSharedData.some(user => user.id === sharedUserUID)) {
      setSharedError("Cet utilisateur a déjà accès à ce document");
      return;
    }

    // Mettre à jour la propriété "shared" de l'élément avec l'UID de l'utilisateur trouvé
    await updateDoc(doc(db, "elements", element), {
      shared: arrayUnion(sharedUserUID)
    });

    // Mettre à jour la propriété "shared" de l'élément avec l'UID de l'utilisateur trouvé
    await setDoc(doc(db, "elements", element), {
      sharedProperties: {
        [sharedUserUID]: { permission: sharedUserPermission }
      }

    },
    {merge: true}
    )

    setShowSuccessNotif(true)
    const newUser = {...sharedUserData, id: sharedUserUID, permission: sharedUserPermission}
    var lastUsers = usersSharedData
    lastUsers.push(newUser)
    setUsersSharedData(lastUsers)
    return "good";
  } else if (querySnapshot.size === 0) {
    setSharedError("Aucun utilisateur trouvé avec cette adresse e-mail.");
  } else {
    setSharedError("Plusieurs utilisateurs trouvés avec cette adresse e-mail.");
  }
}