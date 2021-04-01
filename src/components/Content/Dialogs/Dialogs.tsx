import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Dialogs.module.css'

type DialogPropsType = {
    id: number
    name: string
}

function Dialog(props: DialogPropsType) {
    return (
        <NavLink to={`/dialogs/${props.id}`} className={s.dialogItem}
                 activeClassName={s.active}>{props.name}</NavLink>
    )
}

type UserMessagePropsType = {
    message: string
}

function UserMessage(props: UserMessagePropsType) {
    return (
        <div className={s.messageItem}>{props.message}</div>
    )
}

function Dialogs() {

    const dialogsUsersData = [
        {id: 1, name: 'Kitomo Natsuro'},
        {id: 2, name: 'Sikoko Segun'},
        {id: 3, name: 'Kisyu Natsuro'},
        {id: 4, name: 'Alex'},
        {id: 5, name: 'Iniomo Ui'},
        {id: 6, name: 'Hiroyuki Kagawa'},
        {id: 7, name: 'Xin Jao'},
    ]
    const messagesData = [
        {id: 1, message: 'How\'s your samurai lessons?'},
        {id: 2, message: 'How are you, broh?'},
        {id: 3, message: 'Oi!'},
        {id: 4, message: 'Hi'},
        {id: 4, message: 'Who is this?'},
    ]
    const dialogsElements = dialogsUsersData
        .map(user => <Dialog id={user.id} name={user.name}/>)
    const messagesElements = messagesData
        .map(messageEl => <UserMessage message={messageEl.message}/>)


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

export default Dialogs