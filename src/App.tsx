import React, {Suspense} from 'react'
import './App.css'
import { QueryParamProvider } from 'use-query-params';
import backgroundImage from './assets/img/background/bckgrimg3.jpg'
import samuraiImg from './assets/img/decor/samurai.png'
import NavBar from './components/NavBar/NavBar'
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
import Music from './components/Content/Music/Music'
import Settings from './components/Content/Settings/Settings'
import {SidebarContainer} from './components/Sidebar/SidebarContainer'
import {UsersPage} from './components/Content/Users/UsersPage'
import ProfileContainer from './components/Content/Profile/ProfileContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import {compose} from 'redux'
import {connect, Provider} from 'react-redux'
import {initializeApp} from './redux/app_reducer'
import {AppStateType, store} from './redux/store'
import {Preloader} from './components/Common/Preloader/Preloader'
import WelcomePage from './components/Content/WelcomePage/WelcomePage';

// import DialogsContainer from './components/Content/Dialogs/DialogsContainer'
// import LoginContainer from './components/Login/LoginContainer';

const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'))
const DialogsContainer = React.lazy(() => import('./components/Content/Dialogs/Dialogs'))


class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) return <Preloader left={'40%'} top={'40%'} size={'200px'}/>
        return (
            <div className="app-wrapper"
                 style={{background: `black url(${backgroundImage})`, backgroundSize: '100%',}}>
                <img className={'samuraiImg'} src={samuraiImg} alt="decor element"/>
                <HeaderContainer/>
                {this.props.isAuth && <NavBar />}


                <div className="main-content">
                    {this.props.isAuth && <SidebarContainer/>}
                    <Suspense fallback={<Preloader left={'40%'} top={'40%'} size={'200px'}/>}>
                        <Switch>
                            <Route exact path={'/'} render={() => <Redirect to={'/welcome'}/>}/>
                            <Route path={'/welcome'} render={() => <WelcomePage />}/>
                            <Route path={'/dialogs'} render={() => <DialogsContainer />}/>
                            <Route path={'/profile/:userId?'} render={() => <ProfileContainer />}/>
                            <Route path={'/users/'} render={() => <UsersPage />}/>
                            <Route path={'/music'} render={() => <Music />}/>
                            <Route path={'/settings'} render={() => <Settings />}/>
                            <Route path={'/login'} render={() => <LoginContainer />}/>
                        </Switch>
                    </Suspense>

                </div>
            </div>
        )
    }
}

type MapStateType = {
    initialized: boolean
    isAuth: boolean
}
type MapDispatchType = {
    initializeApp: () => void
}
type AppPropsType = MapStateType & MapDispatchType

const mstp = (state: AppStateType): MapStateType => ({
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth
})

const AppWithConnect = compose(
    connect<MapStateType, MapDispatchType, {}, AppStateType>(mstp, {initializeApp})
)(App)

export const SamuraiApp = () => {
    return (
        <HashRouter>
            <QueryParamProvider ReactRouterRoute={Route}>
                <Provider store={store}>
                    <AppWithConnect />
                </Provider>
            </QueryParamProvider>
        </HashRouter>
    )
}
