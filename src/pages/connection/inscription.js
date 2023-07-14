import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HandleInscription } from './handleClick/handleInscription.js'
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Inscription() {
    const navigate = useNavigate();
    const authentication = getAuth();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        userName: '',
        password: '',
        rePassword: ''
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
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-60 h-auto mr-2" src={require("../../data/images/NovaSuite.png")} alt="logo"></img>
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  S'inscrire
                </h1>
                <div className="space-y-4 md:space-y-6" action="#">
                  {error && (
                    <div className="text-red-500">{error}</div>
                  )}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="email@gmail.com"
                      required={true}
                    ></input>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom d'utilisateur</label>
                    <input
                      value={formData.userName}
                      onChange={handleChange}
                      type="text"
                      name="userName"
                      id="userName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Thibault"
                      required={true}
                    ></input>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                    <input
                      value={formData.password}
                      onChange={handleChange}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                    ></input>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Retaper le même mot de passe
                    </label>
                    <input
                      value={formData.rePassword}
                      onChange={handleChange}
                      type="password"
                      name="rePassword"
                      id="rePassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                    ></input>
                  </div>
                  <button
                    onClick={() => HandleInscription(setFormData, formData, setError, navigate)}
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    S'inscrire
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Déjà un compte ?{' '}
                    <Link to={'/login'} className="font-medium hover:underline text-blue-500">
                      Se connecter !
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default Inscription;