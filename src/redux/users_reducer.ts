import {InferActionsTypes} from './store';
import {PhotosType} from './profile_reducer';

//* ================== Users reducer types ===============================================================>
export type UserType = {
    id: number,
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

//* ================== Initial State ====================================================================>

const initState = {
    users: [] as Array<UserType>,
    pageSize: 7,
    currentPage: 1,
    totalUsersCount: 0,
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
        default:
            return state
    }
}

//* ====== Action Creators =======================================================================>
type UsersActionsType = InferActionsTypes<typeof usersActions>

export const usersActions = {
    follow: (userId: number) => ({type: 'kty112/users_reducer/FOLLOW', userId} as const),
    unfollow: (userId: number) => ({type: 'kty112/users_reducer/UNFOLLOW', userId} as const),
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
}