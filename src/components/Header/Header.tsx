import React from 'react';
import s from './Header.module.css'
import logo from '../../assets/img/logo/logo.png'
import {NavLink} from 'react-router-dom';


type HeaderPropsType = {
    isAuth: boolean
    loginName: string | null
    email: string | null
}

function Header(props: HeaderPropsType) {
    return <header className={s.header}>
        <img
            src={logo}
            width={'123'} height={'62'}
            alt={'logotype'}/>
        <div className={s.login}>
            {props.isAuth ?
                <div>{props.loginName} / {props.email}</div>
                :
                <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>
}

export default Header