import React, {useState} from 'react';
import './style.sass'
import avatar from './avatar.jpg'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const helper = useSelector(state => state.helper)
    let navigate = useNavigate();

    const [img, setImg] = useState('');

    return (
        <div className={'header-container'}>
            <section></section>
            {
                helper ? (
                    <section onClick={() => {navigate(helper.wow)}} className={(helper.active ? ' header-helper-active ' : ' header-helper ') + (helper.error ? ' header-helper-error ' :  ' header-helper ') + (helper.title ? null : ' header-helper-full ')}>
                        <span className={'header-helper-title'}>{helper.title}</span>
                    </section>
                ) : null
            }
            {
                img ? (
                    <section className={'header-container-avatar'}>
                        <img className={'header-avatar'} src={avatar} alt=""/>
                    </section>
                ) : null
            }

        </div>
    );
};

export default Header;
