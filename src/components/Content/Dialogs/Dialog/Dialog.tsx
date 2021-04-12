import {NavLink} from 'react-router-dom';
import s from '../Dialogs.module.css';
import React from 'react';

export type DialogPropsType = {
    id: number
    name: string
    avatar: string
}

export function Dialog(props: DialogPropsType) {
    return (
        <div className={s.dialogItem}>
            <img src={props.avatar} alt="samurai user avatar"/>
            <NavLink to={`/dialogs/${props.id}`} className={s.dialogLink}
                     activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}