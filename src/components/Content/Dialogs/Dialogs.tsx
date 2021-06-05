import React from 'react'
import s from './Dialogs.module.css'
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from './Message/UserMessage';
import {DialogMessageType, DialogUserType} from '../../../redux/dialogs_reducer';
import {DialogsPropsType} from './DialogsContainer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';


export function Dialogs(props: DialogsPropsType) {
    const onSendMessage = (formData: FormDataType) => {
        props.sendMessage(formData.newMessageText)
        formData.newMessageText = ''
    }

//* Dialogs and messages mapping ====================================================================================>>
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
                <SendMessageForm onSubmit={onSendMessage}/>
            </div>
        </div>
    )
}

//* SendMessageForm component ========================================================================================>>
type FormDataType = {
    newMessageText: string
}
const SendMessageForm = reduxForm<FormDataType>({form: 'dialogsSendMessage'})
((props: InjectedFormProps<FormDataType>) => {
    return (
        <form className={s.inputAreaContent} onSubmit={props.handleSubmit}>
            <Field component={'textarea'} name={'newMessageText'} placeholder={'new message'}/>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
})