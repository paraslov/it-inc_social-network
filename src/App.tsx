import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Content/Profile/Profile';
import Dialogs from "./components/Content/Dialogs/Dialogs";
import { Route } from 'react-router-dom';
import News from "./components/Content/News/News";
import Music from "./components/Content/Music/Music";
import Settings from "./components/Content/Settings/Settings";


function App() {
    return (
        <div className="app-wrapper">
            <Header />
            <NavBar />
            <div className="app-wrapper__main-content">
                <Route path={'/dialogs'} component={Dialogs} />
                <Route path={'/profile'} component={Profile} />
                <Route path={'/news'} component={News} />
                <Route path={'/music'} component={Music} />
                <Route path={'/settings'} component={Settings} />
            </div>

        </div>
    );
}

export default App;
