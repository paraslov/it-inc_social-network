import React from 'react'
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {follow, getUsers, setCurrentPageUsers, unfollow, UserType} from '../../../redux/users_reducer';
import {Users} from './Users/Users';
import {Preloader} from '../../Common/Preloader/Preloader';


class UsersContainer extends React.Component<UsersContainerPropsType, AppStateType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageNumberClick = (pageNumber: number) => {
        this.props.setCurrentPageUsers(pageNumber, this.props.pageSize)
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
    getUsers: (page: number, pageSize: number) => Function
    setCurrentPageUsers: (page: number, pageSize: number) => Function
    follow: (userId: number) => Function
    unfollow: (userId: number) => Function
}

export type UsersContainerPropsType = MapStateType & MapDispatchType

//* default export to App.tsx (UsersContainer with HOC connect) ======================================================>>
export default connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapStateToProps, {
    getUsers,
    setCurrentPageUsers,
    follow,
    unfollow,
})(UsersContainer)