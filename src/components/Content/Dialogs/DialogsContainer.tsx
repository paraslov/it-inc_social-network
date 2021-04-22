import React from 'react'
import {dialogsActions} from '../../../redux/dialogs_reducer';
import {Dialogs} from './Dialogs';
import {AppStateType} from '../../../redux/store';
import {StoreContext} from '../../../StoreContext';


export function DialogsContainer() {

    return <StoreContext.Consumer>
        {
            store => {
                const state: AppStateType = store.getState()

                const sendMessage = () => {
                    if (state.dialogsPage.newMessageText.trim() !== '') {
                        store.dispatch(dialogsActions.sendMessage())
                    } // else TODO: error message
                }
                const textareaChange = (text: string) => {
                    store.dispatch(dialogsActions.newMessageTextChange(text))
                }
                return <Dialogs dialogsUsersData={state.dialogsPage.dialogsUsersData}
                                messagesData={state.dialogsPage.messagesData}
                                newMessageText={state.dialogsPage.newMessageText}
                                sendMessage={sendMessage}
                                textareaChange={textareaChange}/>
            }
        }
    </StoreContext.Consumer>
}