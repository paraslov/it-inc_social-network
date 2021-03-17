import React from "react";
import s from './Header.module.css'

function Header() {
    return <header className={s.header}>
        <img
            src={"https://st4.depositphotos.com/9449108/25247/i/600/depositphotos_252470774-stock-photo-samurai-stands-circled-ink-circle.jpg"}
            width={"60"} height={"60"}/>
    </header>
}

export default Header