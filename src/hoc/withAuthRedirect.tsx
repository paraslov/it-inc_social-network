import React, {ComponentType} from 'react'
import {connect} from 'react-redux';
import {AppStateType} from '../redux/store';
import {Redirect} from 'react-router-dom';


type MstpType = {
    isAuth: boolean
}
const mstp = (state: AppStateType): MstpType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MstpType) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as T}/>
    }

    return connect(mstp)(RedirectComponent)
}