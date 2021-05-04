import React from 'react'
import {DialogMessageType, dialogsActions, DialogUserType} from '../../../redux/dialogs_reducer';
import {Dialogs} from './Dialogs';
import {AppStateType} from '../../../redux/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';


type MapStateType = {
    dialogsUsersData: Array<DialogUserType>
    messagesData: Array<DialogMessageType>
    newMessageText: string
}
type MapDispatchType = {
    sendMessage: (newMessageText: string) => void
    textareaChange: (text: string) => void
}
export type DialogsPropsType = MapStateType & MapDispatchType

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        dialogsUsersData: state.dialogsPage.dialogsUsersData,
        messagesData: state.dialogsPage.messagesData,
        newMessageText: state.dialogsPage.newMessageText,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchType => {
    return {
        sendMessage: (newMessageText: string) => {
            if (newMessageText.trim() !== '') {
                dispatch(dialogsActions.sendMessage())
            }
        },
        textareaChange: (text: string) => dispatch(dialogsActions.newMessageTextChange(text)),
    }
}

export const DialogsContainer = connect<MapStateType, MapDispatchType, {}, AppStateType>
                                        (mapStateToProps, mapDispatchToProps)(Dialogs)