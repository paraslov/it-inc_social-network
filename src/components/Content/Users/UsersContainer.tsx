import React from 'react'
import {connect} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from '../../../redux/store';
import {usersActions, UserType} from '../../../redux/users_reducer';
import {Dispatch} from 'redux';

type MapStateType = {
    users: UserType[]
    pageSize: number
    currentPage: number
    totalUsersCount: number
}
const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalUsersCount: state.usersPage.totalUsersCount
    }
}

type MapDispatchType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
    return {
        follow: userId => dispatch(usersActions.follow(userId)),
        unfollow: userId => dispatch(usersActions.unfollow(userId)),
        setUsers: users => dispatch(usersActions.setUsers(users)),
        setCurrentPage: pageNumber => dispatch(usersActions.setCurrentPage(pageNumber)),
        setTotalUsersCount: totalUsersCount => dispatch(usersActions.setTotalUsersCount(totalUsersCount))
    }
}


export type UsersPropsType = MapStateType & MapDispatchType

export const UsersContainer = connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapStateToProps, mapDispatchToProps)(Users)