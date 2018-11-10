import React from 'react';
import './FormText.css';

const FormText = (props) => {
    const { name, placeholder, errors, type="text", onChange, value } = props;
    return (
        <div className="form-text">
            <input formNoValidate type={type} placeholder={placeholder} onChange={onChange} value={value} name={name} className="form-text__input" /><br />
            {Object.keys(errors).length > 0 ? (<small className="form-text__errors">{errors.errors[name]}</small>) : null}
        </div>
    )
}

export default FormText;