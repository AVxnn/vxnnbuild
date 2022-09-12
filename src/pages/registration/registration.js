import React, {useEffect, useState} from 'react';
import './style.sass'
import { useSelector, useDispatch } from 'react-redux'
import Header from "../../components/header/header";
import Hello from "../../components/hello/hello";
import Form from "../../components/form/form";
import { addTitle, addWow, changeActive } from "../../store/helperSlice";
import {ref, getDownloadURL, uploadBytes, deleteObject} from "firebase/storage";
import {doc, updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import { getAuth } from "firebase/auth";
import avatar from './avatar.jpg'
import {
    addUid, editAvatar, editAvatarPath,
    editEmail,
    editName,
    editPassword
} from "../../store/userSlice";
import {
    db,
    storage
} from "../../entities/firebase/firebase";

const Registration = () => {
    let navigate = useNavigate();
    const count = useSelector(state => state.helper)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const auth = getAuth()

    const [img, setImg] = useState('');

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: '',
        avatarPath: '',
        uid: user.uid,
        online: false,
    })

    const valueChange = (item, input) => {
        setData({
            ...data,
            [input]: item.value
        })
    }

    useEffect(() => {
        dispatch(changeActive(false))
        dispatch(addTitle('Привет, давай знакомиться'))
        dispatch(addWow('reg'))
        if (data.name && data.email) {
            dispatch(addTitle('Зарегистрироваться'))
            dispatch(changeActive(true))
        }
        if (data.name.length >= 3) {
            dispatch(editName(data.name))
        }
        if (data.email.length >= 6) {
            dispatch(editEmail(data.email))
        }
        if (data.password.length >= 6) {
            dispatch(editPassword(data.password))
        }
    }, [data])

    useEffect(() => {
        if (img) {
            const uploadImg = async () => {
                const imgRef = ref(
                    storage,
                    `avatar/${new Date().getTime()} - ${img.name}`
                )
                console.log(img)
                try {
                    if (user.avatarPath) {
                        await deleteObject(ref(storage, user.avatarPath))
                    }
                    const snap = await uploadBytes(imgRef, img)
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
                    dispatch(editAvatar(url))
                    dispatch(editAvatarPath(snap))
                    setData({
                        ...data,
                        avatarPath: snap.ref.fullPath,
                        avatar: url
                    })
                    setImg('')
                } catch (e) {
                    console.log(e.message)
                }
            }
            uploadImg()
        }
    }, [img]);

    console.log(user, data)
    return (
        <>
            <div className={'container'}>
                <Header />
                <section className={'auth-container'}>
                    <section className={'auth-content'}>
                        <section className={'hello-container'}>
                            <Hello />
                        </section>
                        {user ? (
                            <>
                                <input id='file'
                                       accept='image/*'
                                       type="file"
                                       onChange={e => setImg(e.target.files[0])}/>
                                <label htmlFor='file' className='section-upload_avatar'>
                                <img className='profile-avatar' src={data.avatar || avatar} alt="avatar"/>
                                </label>
                            </>
                        ) : null }
                        <Form onChange={valueChange} input={'name'} placeholder={'Как тебя зовут?'}/>
                        <Form onChange={valueChange} input={'email'} placeholder={'Email'}/>
                        <Form onChange={valueChange} input={'password'} placeholder={'Создай свой код для входа'}/>
                    </section>
                </section>
                <div id="recaptcha-container"></div>
            </div>
        </>
    );
};

export default Registration;
