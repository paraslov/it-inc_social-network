import React from "react"
import { NavLink } from "react-router-dom"
import s from './Dialogs.module.css'

function Dialogs() {
    return (
        <div className={s.contentWrapper}>
            <div className={s.userDialogs}>
                <NavLink to={'/dialogs/1'} className={s.dialogItem}
                         activeClassName={s.active}>Kitomo Natsuro</NavLink>
                <NavLink to={'/dialogs/2'} className={s.dialogItem}
                         activeClassName={s.active}>Sikoko Segun</NavLink>
                <NavLink to={'/dialogs/3'} className={s.dialogItem}
                         activeClassName={s.active}> Kisyu Natsuro</NavLink>
                <NavLink to={'/dialogs/4'} className={s.dialogItem}
                         activeClassName={s.active}>Alex</NavLink>
                <NavLink to={'/dialogs/5'} className={s.dialogItem}
                         activeClassName={s.active}>Iniomo Ui</NavLink>
                <NavLink to={'/dialogs/6'} className={s.dialogItem}
                         activeClassName={s.active}>Hiroshi Kagawa</NavLink>
                <NavLink to={'/dialogs/7'} className={s.dialogItem}
                         activeClassName={s.active}>Xin Jao</NavLink>
            </div>
            <div className={s.userMessages}>
                <div className={s.messageItem}>How's your samurai lessons?</div>
                <div className={s.messageItem}>How are you, broh?</div>
                <div className={s.messageItem}>Hi</div>
            </div>
        </div>
    )
}

export default Dialogs