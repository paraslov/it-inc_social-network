import React from 'react'
import s from './Dialogs.module.css'
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from './Message/Message';
import {DialogMessageType, DialogsPageType, DialogUserType} from '../../../redux/state';


type DialogsPropsType = {
    dialogsPage: DialogsPageType
}

export function Dialogs(props: DialogsPropsType) {
    const textareaRef = React.createRef<HTMLTextAreaElement>()

    const sendMessage = () => {
        alert(textareaRef.current?.value)
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
                <textarea ref={textareaRef}/>
                <div>
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </div>
    )
}