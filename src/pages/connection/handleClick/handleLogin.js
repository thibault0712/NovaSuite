import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export function HandleLogin(setFormData, formData, setError, navigate){
    console.log(formData.email)
    const authentication = getAuth();
    if (
      formData.email !== '' &&
      formData.password !== ''
    ) {
        signInWithEmailAndPassword(authentication, formData.email, formData.password)
        .then((response) => {
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            navigate('/');
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/missing-email') {
                setError('Email inconnu');
            } else if (error.code === 'auth/wrong-password') {
                setError("Mot de passe incorrect");
            } else{
                console.log(error.message);
                setError('Une erreure inconnue est survenue')
            }
            setFormData({ email: formData.email ,password: ''})
        });
    } else {
      setError('Veuillez remplir tous les champs');
    }
}