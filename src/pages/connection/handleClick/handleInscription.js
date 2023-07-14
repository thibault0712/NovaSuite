import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../data/firebase';
export function HandleInscription(setFormData, formData, setError, navigate){
    console.log(formData.email)
    const authentication = getAuth();
    if (
      formData.email !== '' &&
      formData.userName !== '' &&
      formData.password !== ''
    ) {
        if( formData.rePassword === formData.password ){
            createUserWithEmailAndPassword(authentication, formData.email, formData.password)
            .then(async (response) => {
                await setDoc(doc(db, "users", response.user.uid), {
                    userName: formData.userName,
                });
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                navigate('/');
            })
            .catch((error) => {
                if (error.code === 'auth/weak-password') {
                    setError('Veuillez choisir un mot de passe plus fort');
                } else if (error.code === 'auth/email-already-in-use') {
                    setError("L'adresse email existe déjà. Veuillez utiliser une adresse différente");
                } else if (error.code === "auth/invalid-email") {
                    setError("Addresse email invalid")
                } else{
                    console.log(error.message);
                    setError('Une erreure inconnue est survenue')
                }
                setFormData({ email: formData.email, userName: formData.userName ,password: '', rePassword: '' })
            });
        }else{
            setError('Les deux mots de passes sont différents');
        }
    } else {
      setError('Veuillez remplir tous les champs');
    }
}