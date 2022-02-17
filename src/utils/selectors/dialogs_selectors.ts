import {AppStateType} from '../../redux/store'


export const selectDialogsUsersData = (state: AppStateType) => state.dialogsPage.dialogsUsersData
export const selectMessagesData = (state: AppStateType) => state.dialogsPage.messagesData
