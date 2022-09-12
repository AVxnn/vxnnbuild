import React, {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import Authorization from "../../pages/registration/registration";
import { doc, onSnapshot } from "firebase/firestore";
import {auth, db} from "../firebase/firebase";

const PrivateRoute = ({children}) => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user)
            console.log(user)
        })
    }, [])

    useEffect(() => {
        if (user) {
            const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
                console.log("Current data: ", doc.data());
            })
            return () => unsub()
        }
    }, [user]);


    if (user) {
        return children
    } else {
        navigate('/login')
        return <Authorization />
    }
};

export default PrivateRoute;
