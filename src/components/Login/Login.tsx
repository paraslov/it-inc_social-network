import React from 'react'
import {reduxForm} from 'redux-form'
import {Input, myCreateField} from '../Common/FormControls/FormControls'
import {inputMaxLengthValidate, required} from '../../utils/validators/validators'
import {LoginPropsType} from './LoginContainer'
import {Redirect} from 'react-router-dom'
import formControlStyles from '../Common/FormControls/FormControls.module.css'


export const Login = (props: LoginPropsType) => {
    const handleSubmit = (formData: TLoginFormData) => {
        props.loginUser(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if(props.isAuth) return <Redirect to={'/profile'}/>
    return (
        <div>
            <h2>Login:</h2>
            <LoginForm onSubmit={handleSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

//* Login form component ============================================================================================>>
export type TLoginFormData = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
type TLoginFormProps = {
    captchaUrl: string | null
}
type TFormKeysType = keyof TLoginFormData

const LoginForm = reduxForm<TLoginFormData, TLoginFormProps>({form: 'loginForm'})
((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {myCreateField<TFormKeysType>('email', 'Email', Input, [required, inputMaxLengthValidate])}
            {myCreateField<TFormKeysType>('password', 'password', Input,
                [required, inputMaxLengthValidate], {type: 'password'})}
            {myCreateField<TFormKeysType>('rememberMe', undefined, Input, [], {type: 'checkbox'})}
            {props.captchaUrl && <img src={props.captchaUrl} alt="captcha"/>}
            {props.captchaUrl && myCreateField<TFormKeysType>('captcha', 'enter symbols from image', Input, [required])}
            {props.error && <div className={formControlStyles.serverError}>
                {props.error}
            </div>}
            <div>
                <button>Sign in</button>
            </div>
        </form>
    )
})