import s from '../Dialogs.module.css';
import React from 'react';

export type UserMessagePropsType = {
    message: string
    myMessage: boolean
}

export function UserMessage(props: UserMessagePropsType) {
    return (
        <div className={`${s.messageItem} ${!props.myMessage && s.collocutorMessage}`}>
            {props.myMessage && <div className={s.messageCircle}/>}
            <div className={s.messageText}>{props.message}</div>
            {!props.myMessage && <div className={s.messageCircle}/>}
        </div>

    )
}