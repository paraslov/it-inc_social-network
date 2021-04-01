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
    ]


    return (
        <div className={s.contentWrapper}>
            <div className={s.userDialogs}>
                <Dialog id={dialogsUsersData[0].id} name={dialogsUsersData[0].name}/>
                <Dialog id={2} name={'Sikoko Segun'}/>
                <Dialog id={3} name={'Kisyu Natsuro'}/>
                <Dialog id={4} name={'Alex'}/>
                <Dialog id={5} name={'Iniomo Ui'}/>
                <Dialog id={6} name={'Hiroyushi Kagawa'}/>
                <Dialog id={7} name={'Xin Jao'}/>
            </div>
            <div className={s.userMessages}>
                <UserMessage message={messagesData[0].message}/>
                <UserMessage message={'How are you, broh?'}/>
                <UserMessage message={'Hoi!'}/>
                <UserMessage message={'Hi'}/>
            </div>
        </div>
    )
}

export default Dialogs