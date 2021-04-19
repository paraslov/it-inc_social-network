import dialogsReducer, { DialogsReducerActionsType } from "./dialogs_reducer"
import profileReducer, { ProfileReducerActionsType } from "./profile_reducer"

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
export type PostMessageType = {
    id: number
    message: string
    likesCounter: number
}
export type ProfilePageType = {
    newPostText: string
    postsMessagesData: Array<PostMessageType>
}
export type DialogsPageType = {
    newMessageText: string
    dialogsUsersData: Array<DialogUserType>
    messagesData: Array<DialogMessageType>
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type StoreType = {
    _callSubscriber: (state: StateType) => void
    _subscriber: (observer: (state: StateType) => void) => void
    getState: () => StateType
    _state: StateType
    dispatch: (action: ActionsTypes) => void
}

export const store: StoreType = {
    _callSubscriber(state) {
        console.log('state changed')
    },
    _subscriber(observer) {
        this._callSubscriber = observer
    },
    getState() {
        return this._state
    },
    _state: {
        profilePage: {
            newPostText: '',
            postsMessagesData: [
                {id: 1, message: 'It\'s my first post', likesCounter: 66},
                {id: 2, message: 'It\'s my second post', likesCounter: 22},
                {id: 3, message: 'How are you doing?', likesCounter: 11},
                {id: 4, message: 'I\'m absolutely fine!', likesCounter: 6},
            ],
        },
        dialogsPage: {
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
            ],
            messagesData: [
                {id: 1, message: 'How\'s your samurai lessons?', myMessage: false},
                {id: 2, message: 'How are you, broh?', myMessage: false},
                {id: 3, message: 'Oi!', myMessage: true},
                {id: 4, message: 'Hi', myMessage: false},
                {id: 4, message: 'Who is this?', myMessage: true},
            ],
        },
    },
    dispatch(action: ActionsTypes) {
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._callSubscriber(this._state)
    },
}

export type ActionsTypes = DialogsReducerActionsType | ProfileReducerActionsType


