import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Content/Profile/Profile';
import {Route, Switch} from 'react-router-dom';
import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';
import backgroundImage from './assets/img/background/bckgrimg.jpg'
import {DialogsContainer} from './components/Content/Dialogs/DialogsContainer';
import {SidebarContainer} from './components/Sidebar/SidebarContainer';
import UsersContainer from './components/Content/Users/UsersContainer';


function App() {
    return (
        <div className="app-wrapper"
             style={{background: `black url(${backgroundImage})`, backgroundSize: '100%',}}>
            <Header/>
            <NavBar/>
            <SidebarContainer/>

            <div className="main-content">
                <Switch>
                    <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                    <Route path={'/profile'} render={() => <Profile/>}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
