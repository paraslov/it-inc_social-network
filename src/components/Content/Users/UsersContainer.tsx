import React from 'react'
import {connect} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from '../../../redux/store';
import {usersActions, UserType} from '../../../redux/users_reducer';

type MapStateType = {
    users: UserType[]
}

const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        follow: (userId: number) => dispatch(usersActions.follow(userId)),
        unfollow: (userId: number) => dispatch(usersActions.unfollow(userId)),
        setUsers: (users: UserType[]) => dispatch(usersActions.setUsers(users))
    }
}

type DispatchType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
}

export type UsersPropsType = MapStateType & DispatchType

export const UsersContainer = connect<MapStateType, DispatchType, {}, AppStateType>
(mapStateToProps, mapDispatchToProps)(Users)