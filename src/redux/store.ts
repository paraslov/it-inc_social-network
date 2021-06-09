import {Action, applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer from './profile_reducer';
import dialogsReducer from './dialogs_reducer';
import {usersReducer} from './users_reducer';
import {authReducer} from './auth_reducer';
import ThunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import {appReducer} from './app_reducer';



const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})

//* creating state type ===============================================================================================>
export type AppStateType = ReturnType<typeof rootReducer>

//* creating type to infer types from Actions =========================================================================>
// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

//* creating common thunk typesation type: ===========================================================================>>
export type BaseThunkType<A extends Action = Action, R = void> = ThunkAction<R, AppStateType, unknown, A>


export const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware))


export type StoreType = typeof store