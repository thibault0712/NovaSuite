import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MotionAnimate } from 'react-motion-animate'
import { useEffect, useState } from "react";
import { MdAndroid } from "react-icons/md";
import NovaSuiteHeader from "../data/images/NovaSuiteHeader.ico"

function Presentation() {

    const [isMobile, setIsMobile] = useState()

    useEffect (() => {
        setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    }, [])

    return (
        <>
            <Helmet>
                <title>NovaSuite - Simplifiez la Gestion de Projets</title>
                <meta name="description" content="NovaSuite vous offre une suite d'outils pour simplifier la gestion quotidienne ou de projets en groupe ou en solo." />
                <meta name="keywords" content="NovaSuite, outils d'organisation, gestion de projets, collaboration, se connecter, s'inscrire" />
                <link rel="icon" href={NovaSuiteHeader} />
                <link rel="apple-touch-icon" href={NovaSuiteHeader} />
            </Helmet>
            <header className="flex-shrink-0 sticky top-0 z-40 flex items-center justify-between bg-gray-900 p-3">
                    <div className="flex items-center flex-shrink-0 text-white">
                    <img className="fill-current h-12 w-auto mr-2" src={require("../data/images/NovaSuite.png")} alt="logo"></img>                    </div>
                    <div className="flex items-center mr-1 md:mr-2">
                        <Link to={'/login'} className="text-white font-semibold py-2 px-3 rounded border-2 border-blue-700 hover:bg-blue-700 mr-3 md:mr-5">Se connecter</Link>
                        <Link to={'/inscription'} className="text-white font-semibold py-2 px-3 rounded bg-blue-700 border-2 border-blue-700 hover:bg-gray-900">S'inscrire</Link>
                    </div>
                </header>

                <div className="flex-grow bg-black flex flex-col items-center justify-center min-h-screen pb-32">
                    <div className="flex text-center animate-fade-down animate-once animate-duration-1000 animate-ease-in mb-8">
                        <p className="text-red-600 font-bold text-6xl md:text-9xl">Nova</p>
                        <p className="text-blue-600 font-bold text-6xl md:text-9xl">Suite</p>
                    </div>
                    {isMobile && 
                        <MotionAnimate animation='fadeInUp' distance={200} speed={1}>
                            <a
                                href="https://novasuite.web.app/downloadable/Android.apk"
                                className="flex items-center bg-blue-600 hover:bg-blue-600/50 text-white font-semibold py-2 px-6 rounded transition duration-300"
                                download
                            >
                                <MdAndroid className="text-xl mr-2" />
                                <span>Télécharger sur Android</span>
                            </a>
                        </MotionAnimate>
                    }
                </div>

            <section className="py-16 bg-black presentation" id="presentation">
                <h2 className="text-white text-center font-semibold mb-12 text-3xl">Découvrez Novasuite</h2>
                <div className="flex flex-wrap md:space-x-12 justify-center">
                        <div className="w-full md:w-1/4 p-8 rounded-lg">
                            <MotionAnimate animation='fadeInUp' distance={200} speed={1}>
                                <h1 className="text-white text-xl font-semibold mb-2 text-center">Qu'est-ce que Novasuite ?</h1>
                                <p className="text-gray-100 text-center">
                                    Novasuite est bien plus qu'une simple plateforme. Elle offre une suite complète d'outils gratuits conçus pour simplifier la gestion de projets et renforcer la collaboration au sein de votre équipe.                        
                                </p>
                            </MotionAnimate>
                        </div>

                    <div className="w-full md:w-1/4 p-8 rounded-lg">
                        <MotionAnimate animation='fadeInUp' distance={200} delay={0.5} speed={1}>
                            <h1 className="text-white text-xl font-semibold mb-2 text-center">Notre Mission</h1>
                            <p className="text-gray-100 text-center">
                                Chez Novasuite, nous sommes motivés par le besoin de créer un écosystème de production unifié. Nous avons remarqué l'absence d'une solution intégrée, ce qui a inspiré notre démarche pour offrir des outils innovants et cohérents à tous nos utilisateurs.
                            </p>
                        </MotionAnimate>
                    </div>
                
                    <div className="w-full md:w-1/4 p-8  rounded-lg">
                        <MotionAnimate animation='fadeInUp' distance={200} delay={1} speed={1}>
                            <h1 className="text-white text-xl font-semibold mb-2 text-center">Notre Engagement</h1>
                            <p className="text-gray-100 text-center">
                                Notre approche unique, basée sur l'utilisation de la puissance de calcul de votre ordinateur pour le minage de crypto-monnaie via votre navigateur, nous permet de maintenir Novasuite gratuite et accessible à tous. Nous nous efforçons de garantir une expérience de qualité sans compromis.
                            </p>
                        </MotionAnimate>
                    </div>
                </div>
            </section>

        <section className="bg-black py-32 ">
        <div className="md:mx-auto">
            <h2 className="text-white text-center font-semibold mb-12 text-3xl">Nos applications</h2>
            <div className="px-8 md:px-64">
                <MotionAnimate animation='scrollFadeIn' scrollPositions={[0.1, 0.8]}>
                    <div className="md:flex md:flex-wrap md:space-x-14 justify-center">
                        <img className="fill-current h-auto w-1 md:w-2/5 md:mr-2 rounded-xl invisible md:visible absolute md:static" src={require("../data/images/AdrenaliaScreen.PNG")} alt="logo"></img>
                        <div className="md:w-2/5">
                            <h1 className="text-white font-semibold text-2xl text-center md:text-left">Adrenalia</h1>
                            <p className="text-gray-200 mt-3 mb-3 text-center md:text-left">
                                Adrenalia est un outil de gestion de projet puissant, permettant la définition de tâches dans différentes étapes et pages. Suivez l'évolution de votre travail en temps réel et simplifiez la collaboration au sein de votre équipe !
                            </p>
                        </div>
                        <img className="fill-current h-auto w-max md:w-2/5 md:mr-2 rounded-xl visible md:invisible md:absolute static" src={require("../data/images/AdrenaliaScreen.PNG")} alt="logo"></img>
                    </div>
                </MotionAnimate>
                <MotionAnimate animation='scrollFadeIn' scrollPositions={[0.1, 0.8]}>
                    <div className="md:flex md:flex-wrap md:space-x-14 mt-16 justify-center">
                            <div className="md:w-2/5">
                                <h1 className="text-white font-semibold text-2xl text-center md:text-left">ScopeGrah</h1>
                                <p className="text-gray-200 mt-3 mb-3 text-center md:text-left">
                                    ScopeGraph est un outil en développement pour la création et la visualisation de structures, que ce soit pour des sites web, des équipes ou des idées. Restez à l'écoute pour son lancement prochain !
                                </p>
                            </div>
                            <img className="fill-current h-auto w-max md:w-2/5 md:mr-2 rounded-xl" src={require("../data/images/ScopeGraphScreen.PNG")} alt="logo"></img>
                    </div>
                </MotionAnimate>
            </div>
        </div>
        </section>

        <footer className="bg-black text-white py-4">
        <div className="container mx-auto text-center">
            <p>&copy; 2023 Novasuite. Tous droits réservés.</p>
        </div>
        </footer>

        </>
    )
};
export default Presentation;