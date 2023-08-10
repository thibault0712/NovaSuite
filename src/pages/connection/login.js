import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HandleLogin } from './handleClick/handleLogin';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Helmet } from 'react-helmet';


function Login() {
    const navigate = useNavigate();
    const authentication = getAuth();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(()=>{
        onAuthStateChanged(authentication, (user) => {
            if (user) {
                navigate('/')
            }
          });
    })
  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-screen">
        <Helmet>
            <title>Se connecter - NovaSuite</title>
            <meta name="description" content="Se connecter à NovaSuite avec son adresse email ! NovaSuite est une suite d'outils pour faciliter l'organisation au quotidien ou dans la gestion de projets en groupe ou en solo." />
            <meta name="keywords" content="se connecter, NovaSuite, outils d'organisation, projet en groupe, projet en solo" />
        </Helmet>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className=" w-60 h-auto mr-2" src={require("../../data/images/NovaSuite.png")}  alt="logo"></img>   
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Se connecter
                </h1>
                <div className="space-y-4 md:space-y-6">
                    {error && (
                        <div className="text-red-500">{error}</div>
                    )}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={formData.email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true}></input>
                    </div>
                    <div >
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                        <input value={formData.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true}></input>
                    </div>
                    <button onClick={() => HandleLogin(setFormData, formData, setError, navigate)} type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Se connecter</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Pas encore de compte ? <Link to={'/inscription'} className="font-medium hover:underline text-blue-500">S'inscrire !</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
}

export default Login;