import React, {useEffect, useState} from 'react';
import './style.sass'
import { useSelector, useDispatch } from 'react-redux'
import Header from "../../components/header/header";
import Hello from "../../components/hello/hello";
import Form from "../../components/form/form";
import {
    addTitle, addWow,
    changeActive
} from "../../store/helperSlice";
import {useNavigate} from "react-router-dom";
import {getAuth , RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Authorization = () => {
    let navigate = useNavigate();
    const count = useSelector(state => state.helper)
    const dispatch = useDispatch()

    const auth = getAuth()


    const [capth, setCapth] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        password: null,
        avatar: ''
    })
    console.log(count)
    const valueChange = (item, input) => {
        setData({
            ...data,
            [input]: item.value
        })
    }

    const join = (item) => {
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(data.password).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(result)
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }

    const sendCodePhone = () => {
        let appVerifier = window.recaptchaVerifier
        setCapth(true)
        if (!capth) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            }, auth);
        }
        dispatch(addTitle('Скоро вам придет SMS с кодом'))
        dispatch(changeActive(false))
        signInWithPhoneNumber(auth, data.phone, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult)
                // ...
            }).catch((error) => {
            // Error; SMS not sent
            console.log(error)
            // ...
        });
    }

    useEffect(() => {
        dispatch(changeActive(false))
        dispatch(addWow(''))
        dispatch(addTitle('Привет, давай знакомиться'))
        if (data.name.length >= 3) {
            dispatch(addTitle('Классное имя'))
        }
        if (data.phone.length >= 6) {
            dispatch(addTitle('А пароль интересный)'))
        }
        if (data.phone.length >= 10 && data.name.length >= 3) {
            dispatch(addTitle('Нажми на кнопку "Отправить код"'))
            dispatch(changeActive(true))
        }
    }, [data])
    useEffect(() => {
        dispatch(addTitle('Привет, давай знакомиться'))
    }, [])

    return (
        <>
            <div className={'container'}>
                <Header />
                <section className={'auth-container'}>
                    <section className={'auth-content'}>
                        <section className={'hello-container'}>
                            <Hello />
                        </section>
                        <Form onChange={valueChange} input={'name'} placeholder={'Как тебя зовут?'}/>
                        <Form onChange={valueChange} input={'phone'} placeholder={'Можешь сказать свои цифры?'}/>
                        {/*<Form onChange={valueChange} input={'password'} placeholder={'Создай свой код для входа'}/>*/}
                        {
                            capth ? (
                                <>
                                    <Form onChange={valueChange} input={'password'} placeholder={'Введи код из SMS'}/>
                                    <button onClick={() => join()}>Войти</button>
                                </>
                            ) : (
                                <button onClick={() => sendCodePhone()}>Отправить код</button>
                            )
                        }
                        <div id="recaptcha-container"></div>
                    </section>
                </section>
            </div>
        </>
    );
};

export default Authorization;
