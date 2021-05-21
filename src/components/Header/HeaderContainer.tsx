import React from 'react';
import {AppStateType} from '../../redux/store';
import Header from './Header';
import {connect} from 'react-redux';
import {setUserLoginData} from '../../redux/auth_reducer';


class HeaderContainer extends React.Component<HeaderContainerPropsType, AppStateType> {
    componentDidMount() {
        this.props.setUserLoginData()
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
    setUserLoginData: () => Function
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
        setUserLoginData
    })(HeaderContainer)