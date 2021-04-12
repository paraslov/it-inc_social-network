import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    addPost,
    newMessageTextChange,
    newPostTextChange,
    sendMessage,
    state,
    StateType,
    subscriber
} from './redux/state';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

export const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost = {addPost} sendMessage={sendMessage}
                     newMessageTextChange={newMessageTextChange} newPostTextChange={newPostTextChange}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    )};

rerenderEntireTree(state)

subscriber(rerenderEntireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
