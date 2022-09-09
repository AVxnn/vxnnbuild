import React from 'react';
import './style.sass'

const Form = ({value, text, active, placeholder, onChange, input}) => {
    return (
        <input className={'form'} type="text" onChange={(e) => onChange(e.currentTarget, input)} placeholder={placeholder} value={value}/>
    );
};

export default Form;
