import React, {useState} from 'react';
import './style.sass'
import avatar from './avatar.jpg'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword
} from "firebase/auth";
import {
    addTitle, addWow,
    changeActive
} from "../../store/helperSlice";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../entities/firebase/firebase";
import {addUid, online} from "../../store/userSlice";

const Header = () => {

    const dispatch = useDispatch()
    const helper = useSelector(state => state.helper)
    const user = useSelector(state => state.user)
    let navigate = useNavigate();

    const auth = getAuth()

    const [img, setImg] = useState('');
    const reg = async () => {
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const userid = userCredential.user;
                dispatch(addUid(userid.uid))
                console.log(user.uid)
            })
            .catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        await setDoc(doc(db, "users", user.uid), {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            avatarPath: JSON.stringify(user.avatarPath),
            password: '',
            uid: user.uid,
            online: user.online,
        });
        dispatch(changeActive(false))
        dispatch(online(true))
        dispatch(addTitle('Главный экран'))
        localStorage.setItem('user', JSON.stringify(user))
        dispatch(addWow(''))
        navigate('/main')
    }

    const signIn = async () => {
        console.log(user, 'ay')
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(addUid(user.uid))
            })
            .catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        dispatch(changeActive(false))
        dispatch(online(true))
        localStorage.setItem('user', JSON.stringify(user))
        dispatch(addTitle('Главный экран'))
        dispatch(addWow(''))
        navigate('/main')
    }

    console.log(user)
    return (
        <div className={'header-container'}>
            <section></section>
            {
                helper.wow  === 'reg' ? (
                    <section onClick={() => reg()} className={(helper.active ? ' header-helper-active ' : ' header-helper ') + (helper.error ? ' header-helper-error ' :  ' header-helper ') + (helper.title ? null : ' header-helper-full ')}>
                        <span className={'header-helper-title'}>{helper.title}</span>
                    </section>
                ) : helper.wow === 'auth' ? (
                    <section onClick={() => signIn()} className={(helper.active ? ' header-helper-active ' : ' header-helper ') + (helper.error ? ' header-helper-error ' :  ' header-helper ') + (helper.title ? null : ' header-helper-full ')}>
                        <span className={'header-helper-title'}>{helper.title}</span>
                    </section>
                ) : (
                    <section className={(helper.active ? ' header-helper-active ' : ' header-helper ') + (helper.error ? ' header-helper-error ' :  ' header-helper ') + (helper.title ? null : ' header-helper-full ')}>
                        <span className={'header-helper-title'}>{helper.title}</span>
                    </section>
                )
            }
            {
                user.online ? (
                    <section className={'header-container-avatar'}>
                        <img className={'header-avatar'} src={user?.avatar} alt=""/>
                    </section>
                ) : null
            }

        </div>
    );
};

export default Header;
