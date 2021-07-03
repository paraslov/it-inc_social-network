import React from 'react'
import {reduxForm} from 'redux-form'
import {Input, myCreateField} from '../Common/FormControls/FormControls'
import {inputMaxLengthValidate, required} from '../../utils/validators/validators'
import {LoginPropsType} from './LoginContainer'
import {Redirect} from 'react-router-dom'
import formControlStyles from '../Common/FormControls/FormControls.module.css'


export const Login = (props: LoginPropsType) => {
    const handleSubmit = (formData: TLoginFormData) => {
        props.loginUser(formData.email, formData.password, formData.rememberMe)
    }
    if(props.isAuth) return <Redirect to={'/profile'}/>
    return (
        <div>
            <h2>Login:</h2>
            <LoginForm onSubmit={handleSubmit}/>
        </div>
    )
}

//* Login form component ============================================================================================>>
export type TLoginFormData = {
    email: string
    password: string
    rememberMe: boolean
}
type TFormKeysType = keyof TLoginFormData

const LoginForm = reduxForm<TLoginFormData>({form: 'loginForm'})
((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {myCreateField<TFormKeysType>('email', 'Email', Input, [required, inputMaxLengthValidate])}
            {myCreateField<TFormKeysType>('password', 'password', Input,
                [required, inputMaxLengthValidate], {type: 'password'})}
            {myCreateField<TFormKeysType>('rememberMe', undefined, Input, [], {type: 'checkbox'})}
            {props.error && <div className={formControlStyles.serverError}>
                {props.error}
            </div>}
            <div>
                <button>Sign in</button>
            </div>
        </form>
    )
})