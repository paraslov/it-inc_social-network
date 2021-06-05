import React from 'react'
import {WrappedFieldProps} from 'redux-form'
import s from './FormControls.module.css'

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error

    return (
        <div className={`${s.formControl} ${hasError ? s.error : ''}`}>
            <textarea {...input} {...props}/> <br/>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error

    return (
        <div className={`${s.formControl} ${hasError ? s.error : ''}`}>
            <input {...input} {...props}/> <br/>
            {hasError && <span>{error}</span>}
        </div>
    )
}