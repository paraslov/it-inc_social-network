import React from 'react'
import {LoginPropsType} from './LoginContainer'
import {Redirect} from 'react-router-dom'
import s from './Login.module.css'
import {useForm} from "react-hook-form";


export const Login = (props: LoginPropsType) => {

  if (props.isAuth) return <Redirect to={'/profile'}/>

  return (
    <div className={s.loginContainer}>
      <div className={s.instructions}>
                <span>To log in get registered
                    <a href={'https://social-network.samuraijs.com/'}
                       target={'_blank'}> here
                    </a>
                </span>
        <span>or use common test account credentials:</span>
        <span>Email: free@samuraijs.com</span>
        <span>Password: free</span>
      </div>

      <h2>Login:</h2>
      <LoginForm loginUser={props.loginUser} captchaUrl={props.captchaUrl}/>
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
  loginUser: (email: string, password: string, rememberMe: boolean, captcha: (string | null)) => void
}

const LoginForm: React.FC<TLoginFormProps> = (({captchaUrl, loginUser}) => {

  const {register, handleSubmit, formState: {errors}, reset} = useForm<TLoginFormData>()

  const onSubmit = ({email, password, rememberMe, captcha}: TLoginFormData) => {
    loginUser(email, password, rememberMe, captcha)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <div>
        <input className={s.formInput} type="email" placeholder={'email'} {...register('email')} />
      </div>
      <div>
        <input className={s.formInput} type="password" placeholder={'password'} {...register('password')} />
      </div>
      <div className={s.checkboxContainer}>
        <label htmlFor="rememberMeId">remember me</label>
        <input className={s.formInput} type="checkbox" {...register('rememberMe')} id={'rememberMeId'} />
      </div>
      {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
      {captchaUrl && <input type="text" placeholder={'enter symbols from image'} {...register('captcha')} />}
      {errors.email && <div>
        {errors?.email}
      </div>}
      <div>
        <button className={s.btn} type={'submit'}>Sign in</button>
      </div>
    </form>
  )
})
