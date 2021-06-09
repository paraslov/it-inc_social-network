import {BaseThunkType, InferActionsTypes} from './store';
import {authAPI} from '../api/authAPI';
import {ResultCodesEnum} from '../api/api';
import {FormAction, stopSubmit} from 'redux-form';

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
                ...action.payload
            }
        default:
            return state
    }
}

//* ====== Action Creators ============================================================================================>
type AuthReducerActionsType = InferActionsTypes<typeof authActions>

export const authActions = {
    setUserData: (userId: number | null, loginName: string | null, email: string | null, isAuth: boolean) =>
        ({type: 'kty112/auth_reducer/SET_USER_DATA', payload: {userId, loginName, email, isAuth}} as const)
}

//* ====== Thunk Creators ==============================================================================================>
type ThunkType = BaseThunkType<AuthReducerActionsType | FormAction>

export const setUserLoginData = (): BaseThunkType<AuthReducerActionsType, Promise<void>> => dispatch => {
        return authAPI.getUserData()
            .then(data => {
                const {id, login, email} = data.data
                if (data.resultCode === ResultCodesEnum.Success) {
                    dispatch(authActions.setUserData(id, login, email, true))
                }
            })
    }
export const loginUser = (email: string, password: string, rememberMe: boolean): ThunkType => dispatch => {
    authAPI.loginUser(email, password, rememberMe)
        .then(data => {
            if(data.resultCode === ResultCodesEnum.Success) {
                dispatch(setUserLoginData())
            } else {
                dispatch(stopSubmit('loginForm', {_error: data.messages ? data.messages[0] : 'Some error'}))
            }
        })
}
export const logoutUser = (): ThunkType => dispatch => {
    authAPI.logoutUser()
        .then(data => {
            if(data.resultCode === ResultCodesEnum.Success) {
                dispatch(authActions.setUserData(null, null, null, false))
            }
        })
}