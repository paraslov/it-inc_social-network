import React from 'react';
import s from './Sidebar.module.css'
import {DialogUserType} from '../../redux/state';
import {Dialog} from '../Content/Dialogs/Dialog/Dialog';

type SidebarPropsType = {
    dialogsUsersData: Array<DialogUserType>
    startIndex: number
}

export function Sidebar(props: SidebarPropsType) {

    const friendsList = props.dialogsUsersData.slice(props.startIndex, props.startIndex + 3)
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