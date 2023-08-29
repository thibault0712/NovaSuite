import { signOut } from "firebase/auth";

export function HandleLogOut(navigate, authentication) {
  sessionStorage.removeItem('Auth Token');
  signOut(authentication)
    .then(() => {
      navigate('/login');
    })
    .catch((error) => {
      console.log('Logout error:', error);
    });
}