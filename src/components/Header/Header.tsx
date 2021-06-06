import React from 'react';
import s from './Header.module.css'
import logo from '../../assets/img/logo/logo.png'
import {NavLink} from 'react-router-dom';
import { HeaderPropsType } from './HeaderContainer';


function Header(props: HeaderPropsType) {
    return <header className={s.header}>
        <img
            src={logo}
            width={'123'} height={'62'}
            alt={'logotype'}/>
        <div className={s.login}>
            {props.isAuth ?
                <div className={s.loginInfo}>
                    <div>{props.loginName} / {props.email}</div>
                    <div className={s.logoutBtn} onClick={() => props.logoutUser()}>Logout</div>
                </div>
                :
                <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>
}

export default Header