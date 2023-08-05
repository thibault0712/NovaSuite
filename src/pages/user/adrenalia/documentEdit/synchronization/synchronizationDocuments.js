import { useEffect } from "react";
import { onSnapshot, query, collection } from 'firebase/firestore';
import { db } from '../../../../../data/firebase';
import { useLocation } from "react-router-dom";


export function SynchronizationDocuments(setDocuments){
    const location = useLocation();

    useEffect (() => {
        const searchParams = new URLSearchParams(location.search);
        const element = searchParams.get('element');

        const queryDocuments = query(collection(db, "elements", element, "documents"));
        const unsubscribe = onSnapshot(queryDocuments, (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach((document) => {
                documents.push({title: document.data().title, position: document.data().position, id : document.id});
            });
            const sortDocuments = [...documents].sort((a, b) => a.position - b.position)
            setDocuments(sortDocuments)
        });
        // Cleanup function to unsubscribe the listener when the component unmounts
        return () => unsubscribe();
    }, [location, setDocuments])
}