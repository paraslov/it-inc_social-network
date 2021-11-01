import React from 'react'
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {
    follow,
    getUsers,
    setCurrentPageUsers,
    unfollow,
    usersActions,
    UserType
} from '../../../redux/users_reducer/users_reducer';
import {Users} from './Users/Users';
import {Preloader} from '../../Common/Preloader/Preloader';
import {
    selectCurrentPage, selectFollowUnfollowInProgress, selectIsFetching,
    selectPageSize,
    selectSavedUsers, selectShowFriends, selectTerm,
    selectTotalUsersCount
} from '../../../utils/selectors/users_selectors';
import s from './Users.module.css'
import {IGetUsersRequest} from "../../../api/usersAPI";


class UsersContainer extends React.Component<UsersContainerPropsType, AppStateType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    componentDidUpdate(prevProps: Readonly<UsersContainerPropsType>, prevState: Readonly<AppStateType>) {
        if(prevProps.term !== this.props.term || prevProps.showFriends !== this.props.showFriends ||
        prevProps.currentPage !== this.props.currentPage || prevProps.pageSize !== this.props.pageSize) {
            this.props.getUsers(this.props.currentPage, this.props.pageSize)
        }
    }

    onPageNumberClick = (pageNumber: number) => {
        this.props.setCurrentPageUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return (
            <div className={s.wrapper}>
                {this.props.isFetching ? <Preloader left={'40%'} top={'40%'} size={'200px'}/> : null}
                <Users
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    followUnfollowInProgress={this.props.followUnfollowInProgress}
                    setRequestParams={this.props.setRequestParams}
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
    term: string
    showFriends: boolean
}
const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        users: selectSavedUsers(state),
        pageSize: selectPageSize(state),
        currentPage: selectCurrentPage(state),
        totalUsersCount: selectTotalUsersCount(state),
        isFetching: selectIsFetching(state),
        followUnfollowInProgress: selectFollowUnfollowInProgress(state),
        term: selectTerm(state),
        showFriends: selectShowFriends(state),
    }
}

type MapDispatchType = {
    getUsers: (page: number, pageSize: number) => Function
    setCurrentPageUsers: (page: number, pageSize: number) => Function
    follow: (userId: number) => Function
    unfollow: (userId: number) => Function
    setRequestParams: (payload: IGetUsersRequest) => void
}

export type UsersContainerPropsType = MapStateType & MapDispatchType

//* default export to App.tsx (UsersContainer with HOC connect) ======================================================>>
export default connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapStateToProps, {
    getUsers,
    setCurrentPageUsers,
    follow,
    unfollow,
    setRequestParams: usersActions.setGetUsersRequestParams,
})(UsersContainer)
