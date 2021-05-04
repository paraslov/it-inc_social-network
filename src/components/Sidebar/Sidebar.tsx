import React from 'react';
import s from './Sidebar.module.css'
import {Dialog} from '../Content/Dialogs/Dialog/Dialog';
import {DialogUserType} from '../../redux/dialogs_reducer';
import {SidebarPropsType} from './SidebarContainer';


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