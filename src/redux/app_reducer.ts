import {BaseThunkType, InferActionsTypes} from './store';
import {setUserLoginData} from './auth_reducer';

//* ================== Initial State ==================================================================================>
const initState = {
    initialized: false
}
type AppReducerType = typeof initState

export const appReducer = (state: AppReducerType = initState, action: AppReducerActionsType) => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {...state, initialized: true}
        default:
            return state
    }
}

//* ====== Action Creators ============================================================================================>
type AppReducerActionsType = InferActionsTypes<typeof appActions>
export const appActions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const)
}

//* ====== Thunk Creators ==============================================================================================>
type ThunkType = BaseThunkType<AppReducerActionsType>
export const initializeApp = (): ThunkType => dispatch => {
    dispatch(setUserLoginData())
        .then(() => {
            dispatch(appActions.initializedSuccess())
        })
}