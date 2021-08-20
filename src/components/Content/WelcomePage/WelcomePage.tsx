import s from './WelcomePage.module.css'
import papyrusImg from '../../../assets/img/decor/papirus2.png'
import eyesImg from '../../../assets/img/decor/eyes.png'
import shadowImg from '../../../assets/img/decor/shadowsamurai.png'
import React from 'react'
import { NavLink } from 'react-router-dom'


export const WelcomePage = () => {
    return (
        <div className={s.welcomeContainer}>
            <img className={s.papyrus} src={papyrusImg} alt="papyrus"/>
            <img src={eyesImg} className={s.eyes} alt="eyes"/>
            <img src={shadowImg} className={s.shadow} alt="shadow samurai"/>
            <NavLink className={s.btn} to={'/login'}>JOIN US</NavLink>
        </div>
    )
}