import React from 'react'
import {dialogsActions} from '../../../redux/dialogs_reducer';
import {Dialogs} from './Dialogs';
import {AppStateType, StoreType} from '../../../redux/store';


export type DialogsContainerPropsType = {
    store: StoreType
}

export function DialogsContainer(props: DialogsContainerPropsType) {

    const state: AppStateType = props.store.getState()

    const sendMessage = () => {
        if (state.dialogsPage.newMessageText.trim() !== '') {
            props.store.dispatch(dialogsActions.sendMessage())
        } // else TODO: error message
    }
    const textareaChange = (text: string) => {
        props.store.dispatch(dialogsActions.newMessageTextChange(text))
    }

    return (
        <Dialogs dialogsUsersData={state.dialogsPage.dialogsUsersData}
        messagesData={state.dialogsPage.messagesData}
        newMessageText={state.dialogsPage.newMessageText}
        sendMessage={sendMessage}
        textareaChange={textareaChange}/>
    )
}