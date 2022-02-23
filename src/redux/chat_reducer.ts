import {chatApi, TDialogMessage} from '../api/chatApi'
import {BaseThunkType, InferActionsTypes} from './store'
import dialogsReducer from './dialogs_reducer'
import {Dispatch} from 'redux'


const initState = {
  messages: [] as TDialogMessage[],
}

export const chatReducer = (state: TInitState = initState, action: ChatActionsTypes) => {
  switch (action.type) {
    case 'kty112/chat_reducer/RECEIVE_MESSAGES':
      return {...state, messages: [...state.messages, ...action.payload.messages]}
    default:
      return state
  }
}

let _subscribeHandler: ((messages: TDialogMessage[]) => void) | null = null
const subscribeHandler = (dispatch: Dispatch) => {
  if (_subscribeHandler === null) {
    _subscribeHandler = (messages: TDialogMessage[]) => {
      dispatch(chatActions.receiveMessages({messages}))
    }
  }

  return _subscribeHandler
}

export const chatActions = {
  receiveMessages: (payload: {messages: TDialogMessage[]}) => ({type: 'kty112/chat_reducer/RECEIVE_MESSAGES', payload} as const),
}

export const startMessagesListening = (): ThunkType => dispatch => {
  chatApi.start()
  chatApi.subscribe(subscribeHandler(dispatch))
}
export const stopMessagesListening = (): ThunkType => dispatch => {
  chatApi.unsubscribe(subscribeHandler(dispatch))
  chatApi.stop()
}
export const sendMessage = (message: string): ThunkType => dispatch => {
  chatApi.send(message)
}

type TInitState = typeof initState
type ThunkType = BaseThunkType<ChatActionsTypes>
export type ChatActionsTypes = InferActionsTypes<typeof chatActions>

export default dialogsReducer
