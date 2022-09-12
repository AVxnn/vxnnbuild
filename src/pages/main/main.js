import React, {useEffect} from 'react';
import './style.sass'
import Header from "../../components/header/header";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addTitle} from "../../store/helperSlice";

const Main = () => {

    let navigate = useNavigate();
    const count = useSelector(state => state.helper)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {

    }, []);


    return (
        <>
            <div className={'container'}>
                <Header />
                <section>
                    <h2 className={'main-title'}>Доброе утро</h2>
                    <h3 className={'main-subtitle'}>{user.name}</h3>
                </section>
            </div>
        </>
    );
};

export default Main;
