import React from 'react';
import {Login} from './Login';
import {AppStateType} from '../../redux/store';
import {connect} from 'react-redux';


type LoginPropsType = {

}

class LoginContainer extends React.Component<LoginPropsType, AppStateType> {
    render () {
        return <Login />
    }
}

export default connect()(LoginContainer)