import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../Common/FormControls/FormControls';
import {inputMaxLengthValidate, required} from '../../utils/validators/validators';


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
const LoginForm = reduxForm<FormDataType>({form: 'loginForm'})
((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={'login'} placeholder={'login'}
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