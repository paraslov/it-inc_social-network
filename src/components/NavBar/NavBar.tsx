import React from "react";
import s from './NavBar.module.css'

function NavBar() {
    return <nav className={s.nav}>
        <div className={s.item}>
            <a href={"#s"}>Profile</a>
        </div>
        <div className={s.item}>
            <a href={"#s"}>Messages</a>
        </div>
        <div className={s.item}>
            <a href={"#s"}>News</a>
        </div>
        <div className={s.item}>
            <a href={"#s"}>Music</a>
        </div>
        <div className={s.item}>
            <a href={"#s"}>Settings</a>
        </div>
    </nav>
}

export default NavBar