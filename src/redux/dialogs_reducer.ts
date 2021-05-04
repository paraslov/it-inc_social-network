import {InferActionsTypes} from './store';

//* ================== Dialogs reducer types ===============================================================>
export type DialogUserType = {
    id: number
    name: string
    avatar: string
}
export type DialogMessageType = {
    id: number
    message: string
    myMessage: boolean
}

//* ================== Initial State =======================================================================>
const initState = {
    newMessageText: '',
    dialogsUsersData: [
        {
            id: 1, name: 'Kitomo Natsuro',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJt-xek2xo2KnR6gWf1A1_a4OTxTXMLVmdJDJ-9wC6xxA4khbW0lKNf4ZflC208TXLzQ&usqp=CAU'
        },
        {
            id: 2, name: 'Sikoko Segun',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkUdW1_Zq7oSMdhFPPBVA95E6I2826kV8E5g&usqp=CAU'
        },
        {
            id: 3, name: 'Kisyu Natsuro',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAlCDzpuVgphrQRGPiOxu6eNeNJHaWM6lslw&usqp=CAU'
        },
        {
            id: 4, name: 'Alex',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQYU_81MJ9p9yHZRIdnyGzyLXvVwDUAhVQA&usqp=CAU'
        },
        {
            id: 5, name: 'Iniomo Ui',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtA3LzTpUVWQrqxVbOVGTtkjMp3DafnXt9Q&usqp=CAU'
        },
        {
            id: 6, name: 'Hiroyuki Kagawa',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_bDsKsWxzoqDxB2lVcPxthT4zaqitcbUMg&usqp=CAU'
        },
        {
            id: 7, name: 'Xin Jao',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxFLuxdlIPooR8nGzHrzE1XehYLDAOo8orqg&usqp=CAU'
        },
    ] as DialogUserType[],
    messagesData: [
        {id: 1, message: 'How\'s your samurai lessons?', myMessage: false},
        {id: 2, message: 'How are you, broh?', myMessage: false},
        {id: 3, message: 'Oi!', myMessage: true},
        {id: 4, message: 'Hi', myMessage: false},
        {id: 4, message: 'Who is this?', myMessage: true},
    ] as DialogMessageType[],
}

export type DialogsPageStateType = typeof initState

const dialogsReducer = (state: DialogsPageStateType = initState, action: DialogsActionsTypes):
    DialogsPageStateType => {
    switch (action.type) {
        case 'kty112/dialogs_reducer/SEND_MESSAGE':
            const newMessage: DialogMessageType = {
                id: state.messagesData.length + 1,
                message: state.newMessageText.trim(),
                myMessage: true
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
                newMessageText: ''
            }
        case 'kty112/dialogs_reducer/NEW_MESSAGE_TEXT_CHANGE':
            return {...state, newMessageText: action.newMessageText}
        default:
            return state
    }
}

//* ====== Action Creators =================================================================>
export type DialogsActionsTypes = InferActionsTypes<typeof dialogsActions>

export const dialogsActions = {
    sendMessage: () => ({type: 'kty112/dialogs_reducer/SEND_MESSAGE'} as const),
    newMessageTextChange: (text: string) =>
        ({type: 'kty112/dialogs_reducer/NEW_MESSAGE_TEXT_CHANGE', newMessageText: text} as const),
}



export default dialogsReducer