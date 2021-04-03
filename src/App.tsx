import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Content/Profile/Profile';
import {Dialogs} from "./components/Content/Dialogs/Dialogs";
import { Route } from 'react-router-dom';
import News from "./components/Content/News/News";
import Music from "./components/Content/Music/Music";
import Settings from "./components/Content/Settings/Settings";
import {StateType} from './index';

type AppPropsType = {
    state: StateType
}

function App(props: AppPropsType) {
    return (
        <div className="app-wrapper">
            <Header />
            <NavBar />
            <div className="app-wrapper__main-content">
                <Route path={'/dialogs'} render={()=> <Dialogs
                    dialogsUsersData = {props.state.dialogsUsersData}
                    messagesData = {props.state.messagesData}/>} />
                <Route path={'/profile'} render={() => <Profile
                    postsMessagesData = {props.state.postsMessagesData}/>} />
                <Route path={'/news'} render={() => <News />} />
                <Route path={'/music'} render={() => <Music />} />
                <Route path={'/settings'} render={() => <Settings />} />
            </div>

        </div>
    );
}

export default App;
