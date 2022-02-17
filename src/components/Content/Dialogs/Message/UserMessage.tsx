import s from '../Dialogs.module.css';
import React from 'react';

export type UserMessagePropsType = {
    message: string
    userName: string
    userPhoto: string
    myMessage: boolean
}

export const UserMessage: React.FC<UserMessagePropsType> = ({message, userName, userPhoto, myMessage}) => {
    return (
        <div className={`${s.messageItem} ${myMessage && s.collocutorMessage}`}>
            <div className={s.messageTextContainer}>
                {!myMessage && <img alt='avatar' src={userPhoto} className={s.messageCircle}/>}
                <span className={s.userName}>{userName}</span>
                {myMessage && <img alt='avatar' src={userPhoto} className={s.messageCircle}/>}
            </div>
            <div className={s.messageText}>{message}</div>
        </div>

    )
}
