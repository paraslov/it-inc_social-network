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
    return (
        <div className={s.contentWrapper}>
            <div className={s.userDialogs}>
                <Dialog id={1} name={'Kitomo Natsuro'}/>
                <Dialog id={2} name={'Sikoko Segun'}/>
                <Dialog id={3} name={'Kisyu Natsuro'}/>
                <Dialog id={4} name={'Alex'}/>
                <Dialog id={5} name={'Iniomo Ui'}/>
                <Dialog id={6} name={'Hiroyushi Kagawa'}/>
                <Dialog id={7} name={'Xin Jao'}/>
            </div>
            <div className={s.userMessages}>
                <UserMessage message={'How\'s your samurai lessons?'} />
                <UserMessage message={'How are you, broh?'} />
                <UserMessage message={'Hoi!'} />
                <UserMessage message={'Hi'} />
            </div>
        </div>
    )
}

export default Dialogs