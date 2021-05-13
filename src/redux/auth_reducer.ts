import {InferActionsTypes} from './store';


const initState = {
    userId: null as number | null,
    loginName: null as string | null,
    email: null as string | null,
    isAuth: false
}
type AuthStateType = typeof initState

export const authReducer = (state: AuthStateType = initState, action: AuthReducerActionsType): AuthStateType => {
    switch (action.type) {
        case 'kty112/auth_reducer/SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        default:
            return state
    }
}

type AuthReducerActionsType = InferActionsTypes<typeof authActions>

export const authActions = {
    setUserData: (userId: number, loginName: string, email: string) =>
        ({type: 'kty112/auth_reducer/SET_USER_DATA', payload: {userId, loginName, email}} as const)
}