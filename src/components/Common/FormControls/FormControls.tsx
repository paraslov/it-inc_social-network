import React from 'react'
import {Field, WrappedFieldProps} from 'redux-form'
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
                                                            text = '') {
    return (
        <div>
            <Field component={component} name={name} placeholder={placeholder}
                   validate={validate} {...props}/>{text}
        </div>
    )
}