import React from 'react';
import {StoreContext} from '../../StoreContext';
import {Sidebar} from './Sidebar';

export function SidebarContainer() {
    const startIndex = Math.floor(Math.random() * 4 + 1)
    console.log(startIndex)

    return <StoreContext.Consumer>
        {
            (store) => {
                return <Sidebar dialogsUsersData={store.getState().dialogsPage.dialogsUsersData}
                                startIndex={startIndex}/>
            }
        }

    </StoreContext.Consumer>


}