import React from 'react';
import {Login} from './Login';
import {AppStateType} from '../../redux/store';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/auth_reducer';


class LoginContainer extends React.Component<LoginPropsType> {
    render () {
        return <Login {...this.props}/>
    }
}


type MapStateType = {
    isAuth: boolean
}
type MapDispatchType = {
    loginUser: (email: string, password: string, rememberMe: boolean) => void
}
export type LoginPropsType = MapStateType & MapDispatchType

const mstp = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(mstp, {loginUser})(LoginContainer)