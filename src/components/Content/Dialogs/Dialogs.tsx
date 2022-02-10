import React from 'react'
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from './Message/UserMessage';
import {DialogMessageType, DialogUserType} from '../../../redux/dialogs_reducer';
import {DialogsPropsType} from './DialogsContainer';
import {SubmitHandler, useForm} from "react-hook-form";
import Joi from "@hapi/joi";
import {joiResolver} from "@hookform/resolvers/joi";
import s from './Dialogs.module.css'

const schema = Joi.object({
  newMessageText: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .required()
    .messages({
      'string.min': 'Message must have at least 3 symbols',
      'string.max': 'Message must be less than 200 symbols',
      'string.empty': 'Type your post than submit',
    })
})

export function Dialogs(props: DialogsPropsType) {

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
      <div className={s.messages}>
        <div className={s.userMessages}>
          {messagesElements}
        </div>
        <div className={s.inputArea}>
          <SendMessageForm sendMessage={props.sendMessage}/>
        </div>
      </div>
    </div>
  )
}

//* SendMessageForm component ========================================================================================>>
type TFormDataType = {
  newMessageText: string
}

type TSendMessageFormProps = {
  sendMessage: (newMessageText: string) => void
}

const SendMessageForm: React.FC<TSendMessageFormProps> = (({sendMessage}) => {
  const {register, handleSubmit, resetField, formState: {errors}} = useForm<TFormDataType>({
    resolver: joiResolver<any>(schema)
  })

  const onSubmit: SubmitHandler<TFormDataType> = (formData) => {
    sendMessage(formData.newMessageText)
    resetField('newMessageText')
  }

  return (
    <form className={s.inputAreaContent} onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('newMessageText')} placeholder={'new message'} />
      {errors.newMessageText && <p className={s.errors}>{errors.newMessageText?.message}</p>}
      <div>
        <button type={'submit'}>Send</button>
      </div>
    </form>
  )
})
