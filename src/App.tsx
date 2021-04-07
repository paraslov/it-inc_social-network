import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Content/Profile/Profile';
import {Dialogs} from './components/Content/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import News from './components/Content/News/News';
import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';
import {StateType} from './redux/state';
import {Sidebar} from './components/Sidebar/Sidebar';


type AppPropsType = {
    state: StateType
    addPost: () => void
    sendMessage: () => void
    newPostTextChange: (newPostText: string) => void
    newMessageTextChange: (newMessageText: string) => void
}

function App(props: AppPropsType) {
    return (
        <div className="app-wrapper">
            <Header/>
            <div className={'sidebar'}>
                <NavBar/>
                <Sidebar dialogsUsersData={props.state.dialogsPage.dialogsUsersData}/>
            </div>

            <div className="app-wrapper__main-content">
                <Route path={'/dialogs'} render={() => <Dialogs
                    dialogsPage={props.state.dialogsPage}
                    newMessageText={props.state.dialogsPage.newMessageText}
                    sendMessage={props.sendMessage}
                    newMessageTextChange={props.newMessageTextChange}
                    />}/>
                <Route path={'/profile'} render={() => <Profile
                    profilePage={props.state.profilePage}
                    addPost={props.addPost}
                    newPostTextChange={props.newPostTextChange}/>}/>
                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
            </div>

        </div>
    );
}

export default App;
