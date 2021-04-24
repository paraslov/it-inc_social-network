import React from 'react'
import {dialogsActions} from '../../../redux/dialogs_reducer';
import {Dialogs} from './Dialogs';
import {AppStateType} from '../../../redux/store';
import {connect} from 'react-redux';
import {DialogMessageType, DialogUserType} from '../../../redux/state';


type MapStateType = {
    dialogsUsersData: Array<DialogUserType>
    messagesData: Array<DialogMessageType>
    newMessageText: string
}

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsUsersData: state.dialogsPage.dialogsUsersData,
        messagesData: state.dialogsPage.messagesData,
        newMessageText: state.dialogsPage.newMessageText,
    }
}

type MapDispatchType = {
    sendMessage: (newMessageText: string) => void
    textareaChange: (text: string) => void
}

const mapDispatchToProps = (dispatch: any) => {
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