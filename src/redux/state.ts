const ADD_POST = 'ADD_POST'
const SEND_MESSAGE = 'SEND_MESSAGE'
const NEW_POST_TEXT_CHANGE = 'NEW_POST_TEXT_CHANGE'
const NEW_MESSAGE_TEXT_CHANGE = 'NEW_MESSAGE_TEXT_CHANGE'

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

export const store = {
    _callSubscriber(state: StateType) {
        console.log('state changed')
    },
    _subscriber(observer: (state: StateType) => void) {
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
    } as StateType,
    dispatch(action: any) {
        if (action.type === ADD_POST) {
            const newPost: PostMessageType = {
                id: this._state.profilePage.postsMessagesData.length + 1,
                message: this._state.profilePage.newPostText,
                likesCounter: 0
            }
            this._state.profilePage.postsMessagesData.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber(this._state)
        } else if (action.type === SEND_MESSAGE) {
            const newMessage: DialogMessageType = {
                id: this._state.dialogsPage.messagesData.length + 1,
                message: this._state.dialogsPage.newMessageText.trim(),
                myMessage: true
            }
            this._state.dialogsPage.messagesData.push(newMessage)
            this._state.dialogsPage.newMessageText = ''
            this._callSubscriber(this._state)
        } else if (action.type === NEW_POST_TEXT_CHANGE) {
            this._state.profilePage.newPostText = action.newPostText
            this._callSubscriber(this._state)
        } else if (action.type === NEW_MESSAGE_TEXT_CHANGE) {
            this._state.dialogsPage.newMessageText = action.newMessageText
            this._callSubscriber(this._state)
        }
    },
}

type NewPostTextChangeACType = (text: string) => ({type: string, newPostText: string})

export const addPostAC = () => ({type: ADD_POST})
export const sendMessageAC = () => ({type: SEND_MESSAGE})
export const newPostTextChangeAC: NewPostTextChangeACType = (text) => ({type: NEW_POST_TEXT_CHANGE, newPostText: text})
export const newMessageTextChangeAC = (text: string) => ({type: NEW_MESSAGE_TEXT_CHANGE, newMessageText: text})


