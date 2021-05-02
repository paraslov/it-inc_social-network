import {InferActionsTypes} from './store';

//* ================== Needed types ===============================================================>
export type UserType = {
    id: number,
    fullName: string
    status: string
    photoUrl: string
    followed: boolean
    location: { country: string, city: string }
}

//* ================== Initial State ===============================================================>

const initialState = {
    users: [] as Array<UserType>,
}

export type UserStateType = typeof initialState

export const usersReducer = (state: UserStateType = initialState, action: UsersActionsType): UserStateType => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)
            }
        default:
            return state
    }
}

//* ====== Action Creators =======================================================================>
type UsersActionsType = InferActionsTypes<typeof usersActions>

export const usersActions = {
    follow: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollow: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: UserType[]) => ({type: 'SET_USERS', users} as const),
}