import React, {useEffect, useRef} from 'react'
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from './Message/UserMessage';
import {DialogUserType} from '../../../redux/dialogs_reducer';
import s from './Dialogs.module.css'
import {selectChatMessages, selectDialogsUsersData} from '../../../utils/selectors/dialogs_selectors'
import {useDispatch, useSelector} from 'react-redux'
import {selectUserId} from '../../../utils/selectors/auth_selectors'
import {SendMessageForm} from './SendMessageForm/SendMessageForm'
import {startMessagesListening} from '../../../redux/chat_reducer'

export type TDialogMessage = {
  message: string
  photo: string
  userId: number
  userName: string
}

function Dialogs() {
  const dispatch = useDispatch()

  const dialogsUsersData = useSelector(selectDialogsUsersData)
  const userId = useSelector(selectUserId)
  const messages = useSelector(selectChatMessages)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    dispatch(startMessagesListening())
  }, [])

//* Dialogs and messages mapping ====================================================================================>>
  const dialogsElements = dialogsUsersData
    .map((user: DialogUserType) => <Dialog key={user.id}
                                           id={user.id}
                                           name={user.name}
                                           avatar={user.avatar} />)
  const messagesElements = messages
    .map((messageEl: TDialogMessage, i) => <UserMessage key={i}
                                                        message={messageEl.message}
                                                        myMessage={messageEl.userId === userId}
                                                        userName={messageEl.userName}
                                                        userPhoto={messageEl.photo} />)

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
          <SendMessageForm />
        </div>
      </div>
    </div>
  )
}

export default Dialogs
