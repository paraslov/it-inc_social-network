import {rerenderEntireTree} from '../render';

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

export const state: StateType = {
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
            {id: 1, name: 'Kitomo Natsuro',
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJt-xek2xo2KnR6gWf1A1_a4OTxTXMLVmdJDJ-9wC6xxA4khbW0lKNf4ZflC208TXLzQ&usqp=CAU"},
            {id: 2, name: 'Sikoko Segun',
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkUdW1_Zq7oSMdhFPPBVA95E6I2826kV8E5g&usqp=CAU"},
            {id: 3, name: 'Kisyu Natsuro',
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAlCDzpuVgphrQRGPiOxu6eNeNJHaWM6lslw&usqp=CAU"},
            {id: 4, name: 'Alex',
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQYU_81MJ9p9yHZRIdnyGzyLXvVwDUAhVQA&usqp=CAU"},
            {id: 5, name: 'Iniomo Ui',
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtA3LzTpUVWQrqxVbOVGTtkjMp3DafnXt9Q&usqp=CAU"},
            {id: 6, name: 'Hiroyuki Kagawa',
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_bDsKsWxzoqDxB2lVcPxthT4zaqitcbUMg&usqp=CAU"},
            {id: 7, name: 'Xin Jao',
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxFLuxdlIPooR8nGzHrzE1XehYLDAOo8orqg&usqp=CAU"},
        ],
        messagesData: [
            {id: 1, message: 'How\'s your samurai lessons?', myMessage: false},
            {id: 2, message: 'How are you, broh?', myMessage: false},
            {id: 3, message: 'Oi!', myMessage: true},
            {id: 4, message: 'Hi', myMessage: false},
            {id: 4, message: 'Who is this?', myMessage: true},
        ],
    },
}

export const addPost = () => {
    const newPost: PostMessageType = {
        id: state.profilePage.postsMessagesData.length + 1,
        message: state.profilePage.newPostText,
        likesCounter: 0
    }
    state.profilePage.postsMessagesData.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}
export const sendMessage = () => {
    const newMessage: DialogMessageType = {
        id: state.dialogsPage.messagesData.length + 1,
        message: state.dialogsPage.newMessageText,
        myMessage: true
    }
    state.dialogsPage.messagesData.push(newMessage)
    state.dialogsPage.newMessageText = ''
    rerenderEntireTree(state)
}

export const newPostTextChange = (newPostText: string) => {
    state.profilePage.newPostText = newPostText
    rerenderEntireTree(state)
}
export const newMessageTextChange = (newMessageText: string) => {
    state.dialogsPage.newMessageText = newMessageText
    rerenderEntireTree(state)
}