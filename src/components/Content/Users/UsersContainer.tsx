import React from 'react'
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {usersActions, UserType} from '../../../redux/users_reducer';
import {Dispatch} from 'redux';
import axios from 'axios';
import {Users} from './Users/Users';

//* UsersContainer component to provide queries =================================================================================================>>
type GetUserRequestType = {
    items: UserType[]
    totalCount: number
    error: string
}

class UsersContainer extends React.Component<UsersContainerPropsType, AppStateType> {

    componentDidMount() {
        axios.get<GetUserRequestType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(200)
            })
    }

    onPageNumberClick = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get<GetUserRequestType>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <Users
                users={this.props.users}
                currentPage={this.props.currentPage}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                onPageNumberClick={this.onPageNumberClick}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        )
    }
}

//* UsersContainer component with HOC connect to get access to context ===============================================>>
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


export type UsersContainerPropsType = MapStateType & MapDispatchType

//* default export to App.tsx (UsersContainer with HOC connect) ======================================================>>
export default connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapStateToProps, mapDispatchToProps)(UsersContainer)