import s from '../Dialogs.module.css';
import React from 'react';

type UserMessagePropsType = {
    message: string
}

export function UserMessage(props: UserMessagePropsType) {
    return (
        <div className={s.messageItem}>{props.message}</div>
    )
}