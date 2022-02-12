import {BaseThunkType, InferActionsTypes} from '../store'
import {PhotosType} from '../profile_reducer'
import {usersAPI} from '../../api/usersAPI'

//* ================== Users reducer types ===============================================================>
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type TSetGetRequest = {
    currentPage: number,
    pageSize: number,
    term?: string,
    showFriends?: null | true,
}

//* ================== Initial State ====================================================================>

const initState = {
    users: [] as Array<UserType>,
    pageSize: 7,
    currentPage: 1,
    totalUsersCount: 0,
    term: '',
    showFriends: null as null | true,
    isFetching: false,
    followUnfollowInProgress: [] as number[]
}

export type UserStateType = typeof initState

export const usersReducer = (state: UserStateType = initState, action: UsersActionsType): UserStateType => {
    switch (action.type) {
        case 'kty112/users_reducer/SET_USERS':
            return {
                ...state,
                users: [...action.users]
            }
        case 'kty112/users_reducer/FOLLOW':
            return {
                ...state,
                //users: updateObjInArray(state.users, 'id', action.userId, {followed: true})
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        case 'kty112/users_reducer/UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        case 'kty112/users_reducer/SET_CURRENT_PAGE_NUMBER':
            return {...state, currentPage: action.pageNumber}
        case 'kty112/users_reducer/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'kty112/users_reducer/SET_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'kty112/users_reducer/SET_FOLLOW_UNFOLLOW_IN_PROGRESS':
            return {
                ...state,
                followUnfollowInProgress: action.inProgress ?
                    [...state.followUnfollowInProgress, action.userId] :
                    state.followUnfollowInProgress.filter(id => id !== action.userId)
            }
        case "kty112/users_reducer/SET_GET_REQUEST_PARAMS":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

//* ====== Action Creators =============================================================================================>
type UsersActionsType = InferActionsTypes<typeof usersActions>

export const usersActions = {
    followSuccess: (userId: number) => ({type: 'kty112/users_reducer/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'kty112/users_reducer/UNFOLLOW', userId} as const),
    setUsers: (users: UserType[]) => ({type: 'kty112/users_reducer/SET_USERS', users} as const),
    setCurrentPage: (pageNumber: number) => ({
        type: 'kty112/users_reducer/SET_CURRENT_PAGE_NUMBER',
        pageNumber
    } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'kty112/users_reducer/SET_TOTAL_USERS_COUNT',
        totalUsersCount
    } as const),
    setIsFetching: (isFetching: boolean) => ({type: 'kty112/users_reducer/SET_IS_FETCHING', isFetching} as const),
    setFollowUnfollowInProgress: (inProgress: boolean, userId: number) =>
        ({type: 'kty112/users_reducer/SET_FOLLOW_UNFOLLOW_IN_PROGRESS', userId, inProgress} as const),
    setGetUsersRequestParams: (payload: TSetGetRequest) =>
        ({type: 'kty112/users_reducer/SET_GET_REQUEST_PARAMS', payload} as const)
}

//* ====== Thunk Creators ============================================================================================>
type ThunkType = BaseThunkType<UsersActionsType>

export const getUsers = (pageNumber: number, pageSize: number): ThunkType => async (dispatch, getState) => {
    dispatch(usersActions.setIsFetching(true))
    const {term, showFriends} = getState().usersPage
    dispatch(usersActions.setCurrentPage(pageNumber))
    const data = await usersAPI.getUsers({pageNumber, pageSize, term, friend: showFriends})
    dispatch(usersActions.setUsers(data.items))
    dispatch(usersActions.setTotalUsersCount(data.totalCount))
    dispatch(usersActions.setIsFetching(false))
}
export const follow = (userId: number): ThunkType => async dispatch => {
    dispatch(usersActions.setFollowUnfollowInProgress(true, userId))
    const data = await usersAPI.follow(userId)
    if (data.resultCode === 0) {
        dispatch(usersActions.followSuccess(userId))
    }
    dispatch(usersActions.setFollowUnfollowInProgress(false, userId))
}
export const unfollow = (userId: number): ThunkType => async dispatch => {
    dispatch(usersActions.setFollowUnfollowInProgress(true, userId))
    const data = await usersAPI.unfollow(userId)
    if (data.resultCode === 0) {
        dispatch(usersActions.unfollowSuccess(userId))
    }
    dispatch(usersActions.setFollowUnfollowInProgress(false, userId))
}
