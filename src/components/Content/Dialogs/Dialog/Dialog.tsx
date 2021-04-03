import {NavLink} from 'react-router-dom';
import s from '../Dialogs.module.css';
import React from 'react';

type DialogPropsType = {
    id: number
    name: string
}

export function Dialog(props: DialogPropsType) {
    return (
        <NavLink to={`/dialogs/${props.id}`} className={s.dialogItem}
                 activeClassName={s.active}>{props.name}</NavLink>
    )
}