import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {StateType, store} from './redux/state';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

export const rerenderEntireTree = (state: StateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost={store.addPost.bind(store)}
                     sendMessage={store.sendMessage.bind(store)}
                     newMessageTextChange={store.newMessageTextChange.bind(store)}
                     newPostTextChange={store.newPostTextChange.bind(store)}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    )
};

rerenderEntireTree(store.getState())

store._subscriber(rerenderEntireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
