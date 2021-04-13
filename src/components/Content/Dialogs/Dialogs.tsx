import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from './Message/UserMessage';
import {
    DialogMessageType,
    DialogsPageType,
    DialogUserType,
    newMessageTextChangeAC,
    sendMessageAC
} from '../../../redux/state';


export type DialogsPropsType = {
    dialogsPage: DialogsPageType
    newMessageText: string
    dispatch: (action: any) => void
}

export function Dialogs(props: DialogsPropsType) {

    const sendMessage = () => {
        if (props.newMessageText.trim() !== '') {
            props.dispatch(sendMessageAC())
        } // else TODO: error message
    }
    const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(newMessageTextChangeAC(e.currentTarget.value))
    }

    const dialogsElements = props.dialogsPage.dialogsUsersData
        .map((user: DialogUserType) => <Dialog key={user.id}
                                               id={user.id}
                                               name={user.name}
                                               avatar={user.avatar}/>)
    const messagesElements = props.dialogsPage.messagesData
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
                              onChange={onTextareaChange}/>
                    <div>
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}