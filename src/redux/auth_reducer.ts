import {InferActionsTypes} from './store';
import {authAPI} from '../api/api';
import {Dispatch} from 'redux';

//* ================== Initial State =======================================================================>
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

//* ====== Action Creators ============================================================================================>
type AuthReducerActionsType = InferActionsTypes<typeof authActions>

export const authActions = {
    setUserData: (userId: number, loginName: string, email: string) =>
        ({type: 'kty112/auth_reducer/SET_USER_DATA', payload: {userId, loginName, email}} as const)
}

//* ====== Thunk Creators ==============================================================================================>
export const setUserLoginData = () => (dispatch: Dispatch) => {
    authAPI.getUserData()
        .then(data => {
            const {id, login, email} = data.data
            if (data.resultCode === 0) {
                dispatch(authActions.setUserData(id, login, email))
            }
        })
}