import {ActionsTypes, DialogMessageType, DialogsPageType } from "./state"


const dialogsReducer = (state: DialogsPageType, action: ActionsTypes) => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            const newMessage: DialogMessageType = {
                id: state.messagesData.length + 1,
                message: state.newMessageText.trim(),
                myMessage: true
            }
            state.messagesData.push(newMessage)
            state.newMessageText = ''
            return state
        case 'NEW_MESSAGE_TEXT_CHANGE':
            state.newMessageText = action.newMessageText
            return state
        default:
            return state
    }
}

export type DialogsReducerActionsType = ReturnType<typeof sendMessageAC> | ReturnType<typeof newMessageTextChangeAC>

export const sendMessageAC = () => ({type: 'SEND_MESSAGE'} as const)
export const newMessageTextChangeAC = (text: string) =>
    ({type: 'NEW_MESSAGE_TEXT_CHANGE', newMessageText: text} as const)


export default dialogsReducer