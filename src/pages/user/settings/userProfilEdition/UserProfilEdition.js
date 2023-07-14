import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GetUserInformation } from './request/getUserInformation'
import { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { PopupPasswordForChanges } from './hooks/popupPasswordForChanges';
import { Link } from 'react-router-dom';


function UserProfilEdition() {
  const navigate = useNavigate();
  const authentication = getAuth()
  const [userData, setUserData] = useState([]);
  const [userUID, setUserUID] = useState();
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [updateNotif, setUpdateNotif] = useState();
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    userName: '', 
    email: '', 
    password: '', 
    repassword: ''
  });
  const [firstFormData, setFirstFormData] = useState({
    userName: '', 
    email: '', 
    password: '', 
    repassword: ''
  });


  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (!user) {
        navigate('/login');
      }
      if (userData.length === 0){
        GetUserInformation(setUserData, user.uid)
        setUserUID(user.uid)
      }else{
        setFormData({    
          userName: userData.userName, 
          email: user.email, 
          password: '', 
          repassword: ''})
      }
      setFirstFormData({    
        userName: userData.userName, 
        email: user.email, 
        password: '', 
        repassword: ''})
    });
  }, [authentication, navigate, userData]);

  useEffect(() => {
    if (error != null){
      Store.addNotification({
        title: "Erreur",
        message: error,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
  }, [error, updateNotif])

  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
  };

    return (
      <div className="bg-gray-50 dark:bg-gray-900 h-screen">
        {showPopup === true && PopupPasswordForChanges(setPassword, password, setShowPopup,formData, firstFormData, userUID, authentication, navigate, setError, setUpdateNotif)}
        <ReactNotifications />
        <header className="flex items-center justify-between flex-wrap bg-white dark:bg-gray-900/5 p-3">
          <div className="flex items-center flex-shrink-0 text-white ml-4">
            <Link to={"/"}>
              <img
                className="fill-current h-12 w-auto mr-2"
                src={require('../../../../data/images/NovaSuite.png')}
                alt="logo"
              ></img>
            </Link>
          </div>
        </header>
        <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center px-6 py-2 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Modfier mon compte
                    </h1>
                    <div className='mt-2 mb-3 flex items-center justify-center'>
                      <Avatar round size='70' name={userData.userName} textSizeRatio={3} />

                    </div>
                    <div className="space-y-4 md:space-y-6">
                        <div className='flex items-center'>
                          <div className='w-full'>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pseudo</label>
                              <input value={formData.userName} onChange={handleChange} type="text" name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Thibault" required={true}></input>
                          </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input value={formData.email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true}></input>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <input value={formData.password} onChange={handleChange} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required={true}></input>
                        </div>
                        <div >
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Retaper mot de passe</label>
                            <input value={formData.repassword} onChange={handleChange} type="password" name="repassword" id="repassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true}></input>
                        </div>
                        {
                          formData.password === formData.repassword ? 
                          <button onClick={() => {setShowPopup(true)}} type="submit" className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Confirmer</button>
                          :
                          <button type="submit" className="w-full text-white bg-green-700 cursor-default opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Confirmer</button>
                        }
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
  
  export default UserProfilEdition;