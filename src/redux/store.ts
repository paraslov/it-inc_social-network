import {combineReducers, createStore} from 'redux';
import profileReducer from './profile_reducer';
import dialogsReducer from './dialogs_reducer';


const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
})

export const store = createStore(reducers)