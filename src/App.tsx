import React from 'react';
import './App.css';
import backgroundImage from './assets/img/background/bckgrimg2.jpg'
import samuraiImg from './assets/img/decor/samurai.png'
import NavBar from './components/NavBar/NavBar';
import {Redirect, Route, Switch} from 'react-router-dom';
import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
import {SidebarContainer} from './components/Sidebar/SidebarContainer';
import UsersContainer from './components/Content/Users/UsersContainer';
import ProfileContainer from './components/Content/Profile/ProfileContainer';
import LoginContainer from './components/Login/LoginContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {initializeApp} from './redux/app_reducer';
import {AppStateType} from './redux/store';
import {Preloader} from './components/Common/Preloader/Preloader';


class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if(!this.props.initialized) return <Preloader left={'40%'} top={'40%'} size={'200px'} />
        return (
            <div className="app-wrapper"
                 style={{background: `black url(${backgroundImage})`, backgroundSize: '100%',}}>
                <img className={'samuraiImg'} src={samuraiImg} alt="decor element"/>
                <HeaderContainer/>
                <NavBar/>
                <SidebarContainer/>

                <div className="main-content">
                    <Switch>
                        <Route exact path={'/'} render={() => <Redirect to={'/profile'}/>}/>
                        <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                        <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                        <Route path={'/users'} render={() => <UsersContainer/>}/>
                        <Route path={'/music'} render={() => <Music/>}/>
                        <Route path={'/settings'} render={() => <Settings/>}/>
                        <Route path={'/login'} render={() => <LoginContainer/>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

type MapStateType = {
    initialized: boolean
}
type MapDispatchType = {
    initializeApp: () => void
}
type AppPropsType = MapStateType & MapDispatchType

const mstp = (state: AppStateType): MapStateType => ({
    initialized: state.app.initialized
})

export default compose(
    connect<MapStateType, MapDispatchType, {}, AppStateType>(mstp,{initializeApp})
)(App);
