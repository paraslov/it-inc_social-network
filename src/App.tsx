import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Content/Profile/Profile';
import {Dialogs} from './components/Content/Dialogs/Dialogs';
import {Route, Switch} from 'react-router-dom';
import News from './components/Content/News/News';
import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';
import {StateType} from './redux/state';
import {Sidebar} from './components/Sidebar/Sidebar';
import backgroundImage from './assets/img/background/bckgrimg.jpg'


type AppPropsType = {
    state: StateType
    dispatch: (action: any) => void
}

function App(props: AppPropsType) {
    return (
        <div className="app-wrapper"
             style={{background: `black url(${backgroundImage})`, backgroundSize: '100%',}}>
            <Header/>
            <NavBar/>
            <Sidebar dialogsUsersData={props.state.dialogsPage.dialogsUsersData}/>

            <div className="main-content">
                <Switch>
                    <Route path={'/dialogs'} render={() => <Dialogs
                        dialogsPage={props.state.dialogsPage}
                        newMessageText={props.state.dialogsPage.newMessageText}
                        dispatch={props.dispatch}
                    />}/>
                    <Route path={'/profile'} render={() => <Profile
                        profilePage={props.state.profilePage}
                        dispatch={props.dispatch}/>}/>
                    <Route path={'/news'} render={() => <News/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
