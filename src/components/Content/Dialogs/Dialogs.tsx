import React, {useEffect, useRef, useState} from 'react'
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from './Message/UserMessage';
import {DialogUserType} from '../../../redux/dialogs_reducer';
import {SubmitHandler, useForm} from "react-hook-form";
import Joi from "@hapi/joi";
import {joiResolver} from "@hookform/resolvers/joi";
import s from './Dialogs.module.css'
import {selectDialogsUsersData} from '../../../utils/selectors/dialogs_selectors'
import {useSelector} from 'react-redux'
import {selectUserId} from '../../../utils/selectors/auth_selectors'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const schema = Joi.object({
  newMessageText: Joi.string()
    .max(200)
    .messages({
      'string.max': 'Message must be less than 200 symbols',
    })
})

export type TDialogMessage = {
  message: string
  photo: string
  userId: number
  userName: string
}

function Dialogs() {
  const dialogsUsersData = useSelector(selectDialogsUsersData)
  const userId = useSelector(selectUserId)

  const [messages, setMessages] = useState<TDialogMessage[]>([])

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    const wsHandler = (e: MessageEvent<any>) => {
      setMessages((messages) => [...messages, ...JSON.parse(e.data)])
    }
    ws.addEventListener('message', wsHandler)
    return () => {
      ws.removeEventListener('message', wsHandler)
    }
  }, [])

//* Dialogs and messages mapping ====================================================================================>>
  const dialogsElements = dialogsUsersData
    .map((user: DialogUserType) => <Dialog key={user.id}
                                           id={user.id}
                                           name={user.name}
                                           avatar={user.avatar}/>)
  const messagesElements = messages
    .map((messageEl: TDialogMessage, i) => <UserMessage key={i}
                                                        message={messageEl.message}
                                                        myMessage={messageEl.userId === userId}
                                                        userName={messageEl.userName}
                                                        userPhoto={messageEl.photo}
    />)

  return (
    <div className={s.contentWrapper}>
      <div className={s.userDialogs}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div className={s.userMessages}>
          {messagesElements}
          <div ref={messagesEndRef}/>
        </div>
        <div className={s.inputArea}>
          <SendMessageForm/>
        </div>
      </div>
    </div>
  )
}

//* SendMessageForm component ========================================================================================>>
type TFormDataType = {
  newMessageText: string
}

type TSendMessageFormProps = {}

const SendMessageForm: React.FC<TSendMessageFormProps> = (() => {
  const {register, handleSubmit, resetField, formState: {errors}} = useForm<TFormDataType>({
    resolver: joiResolver<any>(schema)
  })

  const onSubmit: SubmitHandler<TFormDataType> = (formData) => {
    if (!formData.newMessageText) return
    ws.send(formData.newMessageText)
    resetField('newMessageText')
  }

  return (
    <form className={s.inputAreaContent} onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register('newMessageText')} placeholder={'new message'}/>
      {errors.newMessageText && <p className={s.errors}>{errors.newMessageText?.message}</p>}
      <div>
        <button type={'submit'}>Send</button>
      </div>
    </form>
  )
})

export default Dialogs
