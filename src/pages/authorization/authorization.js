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

const Authorization = () => {

    let navigate = useNavigate();
    const count = useSelector(state => state.helper)
    const dispatch = useDispatch()

    const [data, setData] = useState({
        name: '',
        password: '',
        avatar: ''
    })
    console.log(count)
    const valueChange = (item, input) => {
        setData({
            ...data,
            [input]: item.value
        })
    }

    useEffect(() => {
        dispatch(changeActive(false))
        dispatch(addWow(''))
        dispatch(addTitle(''))
        if (data.name.length >= 3) {
            dispatch(addTitle('Отличное имя'))
        }
        if (data.password.length >= 6) {
            dispatch(addTitle('А пароль интересный)'))
        }
        if (data.password.length >= 6 && data.name.length >= 3) {
            dispatch(addTitle('Нажми на меня'))
            dispatch(changeActive(true))
            dispatch(addWow('/main'))
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
                        <Form onChange={valueChange} input={'password'} placeholder={'Создай свой код для входа'}/>
                    </section>

                </section>

            </div>
        </>
    );
};

export default Authorization;
