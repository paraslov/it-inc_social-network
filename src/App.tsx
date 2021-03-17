import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Profile from './components/Content/Profile/Profile';
import Dialogs from "./components/Content/Dialogs/Dialogs";


function App() {
    return (
        <div className="app-wrapper">
            <Header />
            <NavBar />
            <div className="app-wrapper__main-content">
                {/*<Dialogs />*/}
                <Profile />
            </div>

        </div>
    );
}

export default App;
