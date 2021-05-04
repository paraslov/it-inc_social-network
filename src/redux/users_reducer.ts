import {InferActionsTypes} from './store';

//* ================== User reducer types ===============================================================>
export type UserType = {
    id: number,
    fullName: string
    status: string
    photoUrl: string
    followed: boolean
    location: { country: string, city: string }
}

//* ================== Initial State ====================================================================>

const initlState = {
    users: [] as Array<UserType>,
}

export type UserStateType = typeof initlState

export const usersReducer = (state: UserStateType = initlState, action: UsersActionsType): UserStateType => {
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
}