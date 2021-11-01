import { createSelector } from 'reselect';
import {AppStateType} from '../../redux/store';


export const selectUsers = (state: AppStateType) => state.usersPage.users
// as an example of using createSelector:
export const selectSavedUsers = createSelector(selectUsers, (users) => {
    return users.filter(user => true)
})

export const selectPageSize = (state: AppStateType) => state.usersPage.pageSize
export const selectCurrentPage = (state: AppStateType) => state.usersPage.currentPage
export const selectTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount
export const selectIsFetching = (state: AppStateType) => state.usersPage.isFetching
export const selectFollowUnfollowInProgress = (state: AppStateType) => state.usersPage.followUnfollowInProgress
export const selectTerm = (state: AppStateType) => state.usersPage.term
export const selectShowFriends = (state: AppStateType) => state.usersPage.showFriends
