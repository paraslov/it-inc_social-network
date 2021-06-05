import React from 'react';
import {Field, reduxForm} from 'redux-form';


export const Login = () => {
    const handleSubmit = (formData: FormDataType) => {
        console.log(formData)
    }
    return (
        <div>
            <h2>Login:</h2>
            <LoginForm onSubmit={handleSubmit}/>
        </div>
    )
}

//* Login form component ============================================================================================>>
type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}
const LoginForm = reduxForm<FormDataType>({form: 'login'})
((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'input'} name={'login'} placeholder={'login'}/>
            </div>
            <div>
                <Field component={'input'} name={'password'} placeholder={'password'}/>
            </div>
            <div>
                <Field component={'input'} type={'checkbox'} name={'rememberMe'}/>
            </div>
            <div>
                <button>Sign in</button>
            </div>
        </form>
    )
})