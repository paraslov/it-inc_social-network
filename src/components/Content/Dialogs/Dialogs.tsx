import React from 'react'
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from './Message/UserMessage';
import {DialogMessageType, dialogsActions, DialogUserType} from '../../../redux/dialogs_reducer';
import {SubmitHandler, useForm} from "react-hook-form";
import Joi from "@hapi/joi";
import {joiResolver} from "@hookform/resolvers/joi";
import s from './Dialogs.module.css'
import {selectDialogsUsersData, selectMessagesData} from '../../../utils/selectors/dialogs_selectors'
import {useDispatch, useSelector} from 'react-redux'

const schema = Joi.object({
  newMessageText: Joi.string()
    .max(200)
    .messages({
      'string.max': 'Message must be less than 200 symbols',
    })
})

function Dialogs() {
  const dispatch = useDispatch()

  const dialogsUsersData = useSelector(selectDialogsUsersData)
  const messagesData = useSelector(selectMessagesData)

  const sendMessage = (newMessageText: string) => {
    dispatch(dialogsActions.sendMessage(newMessageText))
  }

//* Dialogs and messages mapping ====================================================================================>>
  const dialogsElements = dialogsUsersData
    .map((user: DialogUserType) => <Dialog key={user.id}
                                           id={user.id}
                                           name={user.name}
                                           avatar={user.avatar}/>)
  const messagesElements = messagesData
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
          <SendMessageForm sendMessage={sendMessage}/>
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
    if (!formData.newMessageText) return
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

export default Dialogs
