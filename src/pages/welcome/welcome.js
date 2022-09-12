import React from 'react';
import Header from "../../components/header/header";
import './style.sass'
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <div className={'container'}>
            <Header />
            <section className={'welcome-conteiner'}>
                <section className={'welcome-content'}>
                    <h4 className={'welcome-subtitle'}>Создай свой мир с</h4>
                    <h1 className={'welcome-title'}>VXNNBUILD</h1>
                </section>
                <button className={'welcome-btn'}><Link to={'registration'}>Создать</Link></button>
                <button className={'welcome-btn'}><Link to={'authorization'}>Войти</Link></button>
            </section>
        </div>
    );
};

export default Welcome;
