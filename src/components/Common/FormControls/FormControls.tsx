import React from 'react'
import {WrappedFieldProps} from 'redux-form'
import s from './FormControls.module.css'
import {ValidatorType} from '../../../utils/validators/validators'

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

export function myCreateField<FormKeysType extends string> (name: FormKeysType,
                                                            placeholder: string | undefined,
                                                            component: string | React.Component | React.FC<WrappedFieldProps>,
                                                            validate: ValidatorType[],
                                                            props = {},
                                                            className = '',
                                                            text = '',
                                                            id= '') {
    return (
        <div>
            <input name={name} placeholder={placeholder} {...props} id={id} className={className}/>{text}
        </div>
    )
}
