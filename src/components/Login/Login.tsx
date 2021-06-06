import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../Common/FormControls/FormControls';
import {inputMaxLengthValidate, required} from '../../utils/validators/validators';
import {LoginPropsType} from './LoginContainer';
import {Redirect} from 'react-router-dom';


export const Login = (props: LoginPropsType) => {
    const handleSubmit = (formData: LoginFormDataType) => {
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
export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
const LoginForm = reduxForm<LoginFormDataType>({form: 'loginForm'})
((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={'email'} placeholder={'e-mail'}
                       validate={[required, inputMaxLengthValidate]}/>
            </div>
            <div>
                <Field component={Input}
                       type={'password'}
                       name={'password'}
                       placeholder={'password'}
                       validate={[required, inputMaxLengthValidate]}/>
            </div>
            <div>
                <Field component={Input} type={'checkbox'} name={'rememberMe'}/>
            </div>
            <div>
                <button>Sign in</button>
            </div>
        </form>
    )
})