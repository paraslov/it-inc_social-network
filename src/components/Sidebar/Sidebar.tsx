import React from 'react';
import s from './Sidebar.module.css'
import {NavLink} from 'react-router-dom';
import {DialogUserType} from '../../redux/state';
import {Dialog} from '../Content/Dialogs/Dialog/Dialog';

type SidebarPropsType = {
    dialogsUsersData: Array<DialogUserType>
}

export function Sidebar(props: SidebarPropsType) {
    const startIndex = Math.floor(Math.random() * 4 + 1)
    console.log(startIndex)
    const friendsList = props.dialogsUsersData.slice(startIndex, startIndex + 3)
        .map((user: DialogUserType) => <Dialog key={user.id}
                                               id={user.id}
                                               name={user.name}
                                               avatar={user.avatar}/>)

    return (
        <div className={s.sidebarWrapper}>
            <h2>Friends</h2>
            {friendsList}
        </div>
    )
}