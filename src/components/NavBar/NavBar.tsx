import React from "react";
import { NavLink } from "react-router-dom";
import s from './NavBar.module.css'

function NavBar() {
    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to={"/profile"} activeClassName={s.activeLink}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={"/dialogs"} activeClassName={s.activeLink}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={"/users"} activeClassName={s.activeLink}>Samurais</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={"/music"} activeClassName={s.activeLink}>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to={"/settings"} activeClassName={s.activeLink}>Settings</NavLink>
        </div>
    </nav>
}

export default NavBar