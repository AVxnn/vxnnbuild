import React, {useEffect, useState} from 'react';
import Header from "../../components/header/header";
import Hello from "../../components/hello/hello";
import Form from "../../components/form/form";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "firebase/auth";
import {
    addTitle, addWow,
    changeActive
} from "../../store/helperSlice";
import {
    editEmail,
    editName,
    editPassword
} from "../../store/userSlice";

const Authorization = () => {

    const count = useSelector(state => state.helper)
    const dispatch = useDispatch()

    const auth = getAuth()

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: '',
        uid: '',
        online: false,
    })
    console.log(data)
    const valueChange = (item, input) => {
        setData({
            ...data,
            [input]: item.value
        })
    }



    useEffect(() => {
        dispatch(changeActive(false))
        dispatch(addTitle('Привет, рад тебя видеть'))
        dispatch(addWow('auth'))
        if (data.email && data.password) {
            dispatch(addTitle('Войти'))
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

    return (
        <>
            <div className={'container'}>
                <Header />
                <section className={'auth-container'}>
                    <section className={'auth-content'}>
                        <section className={'hello-container'}>
                            <Hello />
                        </section>
                        <Form onChange={valueChange} input={'email'} placeholder={'Email'}/>
                        <Form onChange={valueChange} input={'password'} placeholder={'Введи сюда код'}/>
                    </section>
                </section>
                <div id="recaptcha-container"></div>
            </div>
        </>
    );
};

export default Authorization;
