import React from "react";
import s from './Header.module.css'
import logo from '../../assets/img/logo/logo.png'

function Header() {
    return <header className={s.header}>
        <img
            src={logo}
            width={"123"} height={"62"}/>
    </header>
}

export default Header