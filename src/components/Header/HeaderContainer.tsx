import React from 'react';
import {AppStateType} from '../../redux/store';
import Header from './Header';
import {connect} from 'react-redux';
import {authActions} from '../../redux/auth_reducer';
import axios from 'axios';


class HeaderContainer extends React.Component<HeaderContainerPropsType, AppStateType> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
            withCredentials: true
        })
            .then(response => {
                const {id, login, email} = response.data.data
                if (response.data.resultCode === 0) {
                    this.props.setUserData(id, login, email)
                }
            })
    }

    render() {
        return <Header {...this.props}/>
    }
}

type MapStateType = {
    loginName: string | null
    email: string | null
    isAuth: boolean
}
type MapDispatchType = {
    setUserData: (userId: number, login: string, email: string) => void
}
type HeaderContainerPropsType = MapStateType & MapDispatchType
const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        loginName: state.auth.loginName,
        email: state.auth.email,
        isAuth: state.auth.isAuth
    }
}


export default connect<MapStateType, MapDispatchType, {}, AppStateType>(mapStateToProps,
    {
        setUserData: authActions.setUserData
    })(HeaderContainer)