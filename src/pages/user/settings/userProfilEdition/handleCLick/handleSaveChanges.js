import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../data/firebase";
import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";


export async function HandleSaveChanges(formData, firstFormData, userUid, authentication, navigate, setError, setUpdateNotif, password){
    reauthenticateWithCredential(authentication.currentUser, EmailAuthProvider.credential(firstFormData.email, password))
  .then(async () => {
    if (firstFormData.userName !== formData.userName){
      const userRef = doc(db, "users", userUid);
      await updateDoc(userRef, {
        userName: formData.userName,
      });
      navigate("/")
    }

    if (firstFormData.email !== formData.email){
      updateEmail(authentication.currentUser, formData.email).then(async () => {
        await updateDoc(doc(db, "users", userUid), {
          email: formData.email
        });
        navigate("/")
      }).catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
            setError("L'adresse email existe déjà. Veuillez utiliser une adresse différente");
        } else if (error.code === "auth/invalid-email") {
            setError("Addresse email invalid")
        } else{
          console.log(error.message);
          setError('Une erreure inconnue est survenue')
        }
        setUpdateNotif(formData)
      });
    }

    if (firstFormData.password !== formData.password){
      if (formData.password === formData.repassword){
        updatePassword(authentication.currentUser, formData.password).then(() => {
          navigate("/")
        }).catch((error) => {
          if (error.code === 'auth/weak-password') {
              setError('Veuillez choisir un mot de passe plus fort');
          }else{
              console.log(error.message);
              setError('Une erreure inconnue est survenue')
          }
          setUpdateNotif(formData)
        });      
      }
    }
  })
  .catch((error) => {
    if (error.code === 'auth/wrong-password') {
      setError('Mot de passe incorect');
    }else{
        console.log(error.message);
        setError('Une erreure inconnue est survenue')
    }
    setUpdateNotif(formData)
  });


}