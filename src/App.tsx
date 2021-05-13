import React from 'react';
import './App.css';
import backgroundImage from './assets/img/background/bckgrimg2.jpg'
import samuraiImg from './assets/img/decor/samurai.png'
import NavBar from './components/NavBar/NavBar';
import {Route, Switch} from 'react-router-dom';
import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';
import {DialogsContainer} from './components/Content/Dialogs/DialogsContainer';
import {SidebarContainer} from './components/Sidebar/SidebarContainer';
import UsersContainer from './components/Content/Users/UsersContainer';
import ProfileContainer from './components/Content/Profile/ProfileContainer';
import LoginContainer from './components/Login/LoginContainer';
import HeaderContainer from './components/Header/HeaderContainer';


function App() {
    return (
        <div className='app-wrapper'
             style={{background: `black url(${backgroundImage})`, backgroundSize: '100%',}}>
            <img className={'samuraiImg'} src={samuraiImg} alt="decor element"/>
            <HeaderContainer />
            <NavBar/>
            <SidebarContainer/>

            <div className="main-content">
                <Switch>
                    <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                    <Route path={'/users'} render={() => <UsersContainer/>}/>
                    <Route path={'/music'} render={() => <Music/>}/>
                    <Route path={'/settings'} render={() => <Settings/>}/>
                    <Route path={'/login'} render={() => <LoginContainer />}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
