import {AppStateType} from '../../redux/store'


export const selectUserId = (state: AppStateType) => state.auth.userId
