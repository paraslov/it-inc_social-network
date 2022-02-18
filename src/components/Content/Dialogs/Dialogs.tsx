import React, {useEffect, useRef, useState} from 'react'
import {Dialog} from './Dialog/Dialog';
import {UserMessage} from './Message/UserMessage';
import {DialogUserType} from '../../../redux/dialogs_reducer';
import s from './Dialogs.module.css'
import {selectDialogsUsersData} from '../../../utils/selectors/dialogs_selectors'
import {useSelector} from 'react-redux'
import {selectUserId} from '../../../utils/selectors/auth_selectors'
import {SendMessageForm} from './SendMessageForm/SendMessageForm'

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
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    let ws: WebSocket
    const onWsCloseHandler = () => {
      console.log('CLOSE!!!')
      setWsChannel(null)
      setTimeout(createWebSocket, 3000)
    }

    function createWebSocket() {
      ws?.removeEventListener('close', onWsCloseHandler)
      ws?.close()
      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws.addEventListener('close', onWsCloseHandler)
      setWsChannel(ws)
    }
    createWebSocket();

    return () => {
      ws.removeEventListener('close', onWsCloseHandler)
      ws.close()
    }
  }, [])

  useEffect(() => {
    const wsHandler = (e: MessageEvent<any>) => {
      setMessages((messages) => [...messages, ...JSON.parse(e.data)])
    }
    wsChannel?.addEventListener('message', wsHandler)
    return () => {
      wsChannel?.removeEventListener('message', wsHandler)
    }
  }, [wsChannel])

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
          <SendMessageForm wsChannel={wsChannel}/>
        </div>
      </div>
    </div>
  )
}

export default Dialogs
