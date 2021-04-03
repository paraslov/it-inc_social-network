import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

export type DialogUserType = {
    id: number
    name: string
}
export type DialogMessageType = {
    id: number
    message: string
}
export type PostMessageType = {
    id: number
    message: string
    likesCounter: number
}
export type StateType = {
    dialogsUsersData: Array<DialogUserType>
    messagesData: Array<DialogMessageType>
    postsMessagesData: Array<PostMessageType>
}

const state: StateType = {
    dialogsUsersData: [
        {id: 1, name: 'Kitomo Natsuro'},
        {id: 2, name: 'Sikoko Segun'},
        {id: 3, name: 'Kisyu Natsuro'},
        {id: 4, name: 'Alex'},
        {id: 5, name: 'Iniomo Ui'},
        {id: 6, name: 'Hiroyuki Kagawa'},
        {id: 7, name: 'Xin Jao'},
    ],
    messagesData: [
        {id: 1, message: 'How\'s your samurai lessons?'},
        {id: 2, message: 'How are you, broh?'},
        {id: 3, message: 'Oi!'},
        {id: 4, message: 'Hi'},
        {id: 4, message: 'Who is this?'},
    ],
    postsMessagesData: [
        {id: 1, message: 'I\'m absolutely fine!', likesCounter: 17},
        {id: 2, message: 'How are you doing?', likesCounter: 10},
        {id: 3, message: 'It\'s my second post', likesCounter: 22},
        {id: 4, message: 'It\'s my first post', likesCounter: 66},
    ]
}


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App state={state}/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
