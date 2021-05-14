import React from 'react'
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {usersActions, UserType} from '../../../redux/users_reducer';
import {Users} from './Users/Users';
import {Preloader} from '../../Common/Preloader/Preloader';
import {usersAPI} from '../../../api/api';


class UsersContainer extends React.Component<UsersContainerPropsType, AppStateType> {

    componentDidMount() {
        this.props.setIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.setIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(200)
            })
    }

    onPageNumberClick = (pageNumber: number) => {
        this.props.setIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.setIsFetching(false)
                this.props.setUsers(data.items)
            })
    }

    render() {
        return (
            <div>
                {this.props.isFetching ? <Preloader left={'40%'} top={'40%'} size={'200px'}/> : null}
                <Users
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    followUnfollowInProgress={this.props.followUnfollowInProgress}
                    onPageNumberClick={this.onPageNumberClick}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    setFollowUnfollowInProgress={this.props.setFollowUnfollowInProgress}
                />
            </div>
        )
    }
}

//* UsersContainer component with HOC connect to get access to context ===============================================>>
type MapStateType = {
    users: UserType[]
    pageSize: number
    currentPage: number
    totalUsersCount: number
    isFetching: boolean
    followUnfollowInProgress: number[]
}
const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        totalUsersCount: state.usersPage.totalUsersCount,
        isFetching: state.usersPage.isFetching,
        followUnfollowInProgress: state.usersPage.followUnfollowInProgress
    }
}

type MapDispatchType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    setIsFetching: (isFetching: boolean) => void
    setFollowUnfollowInProgress: (inProgress: boolean, userId: number) => void
}

export type UsersContainerPropsType = MapStateType & MapDispatchType

//* default export to App.tsx (UsersContainer with HOC connect) ======================================================>>
export default connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapStateToProps, {
    follow: usersActions.follow,
    unfollow: usersActions.unfollow,
    setUsers: usersActions.setUsers,
    setCurrentPage: usersActions.setCurrentPage,
    setTotalUsersCount: usersActions.setTotalUsersCount,
    setIsFetching: usersActions.setIsFetching,
    setFollowUnfollowInProgress: usersActions.setFollowUnfollowInProgress
})(UsersContainer)