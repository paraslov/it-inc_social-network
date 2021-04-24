import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from './Message/UserMessage';
import {DialogMessageType, DialogUserType,} from '../../../redux/state';


export type DialogsPropsType = {
    dialogsUsersData: Array<DialogUserType>
    messagesData: Array<DialogMessageType>
    newMessageText: string
    sendMessage: (newMessageText: string) => void
    textareaChange: (text: string) => void
}

export function Dialogs(props: DialogsPropsType) {

    const onSendMessage = () => {
        props.sendMessage(props.newMessageText)
    }
    const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.textareaChange(e.currentTarget.value)
    }

    const dialogsElements = props.dialogsUsersData
        .map((user: DialogUserType) => <Dialog key={user.id}
                                               id={user.id}
                                               name={user.name}
                                               avatar={user.avatar}/>)
    const messagesElements = props.messagesData
        .map((messageEl: DialogMessageType) => <UserMessage key={messageEl.id}
                                                            message={messageEl.message}
                                                            myMessage={messageEl.myMessage}/>)


    return (
        <div className={s.contentWrapper}>
            <div className={s.userDialogs}>
                {dialogsElements}
            </div>
            <div className={s.userMessages}>
                {messagesElements}
            </div>
            <div className={s.inputArea}>
                <div className={s.inputAreaContent}>
                    <textarea value={props.newMessageText}
                              placeholder={'type your message'}
                              onChange={onTextareaChange}/>
                    <div>
                        <button onClick={onSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}