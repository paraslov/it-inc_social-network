import React from 'react'
import {DialogMessageType, dialogsActions, DialogUserType} from '../../../redux/dialogs_reducer';
import {Dialogs} from './Dialogs';
import {AppStateType} from '../../../redux/store';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';


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

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect<MapStateType, MapDispatchType, {}, AppStateType>
    (mapStateToProps, {
        sendMessage: dialogsActions.sendMessage,
        textareaChange: dialogsActions.newMessageTextChange,
    })
)(Dialogs)