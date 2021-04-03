import React from 'react'
import s from './Dialogs.module.css'
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from './Message/Message';
import {DialogMessageType, DialogUserType} from '../../../index';

type DialogsPropsType = {
    dialogsUsersData: Array<DialogUserType>
    messagesData: Array<DialogMessageType>
}

export function Dialogs(props: DialogsPropsType) {

    const dialogsElements = props.dialogsUsersData
        .map((user: DialogUserType) => <Dialog id={user.id} name={user.name}/>)
    const messagesElements = props.messagesData
        .map((messageEl: DialogMessageType) => <UserMessage message={messageEl.message}/>)


    return (
        <div className={s.contentWrapper}>
            <div className={s.userDialogs}>
                {dialogsElements}
            </div>
            <div className={s.userMessages}>
                {messagesElements}
            </div>
        </div>
    )
}