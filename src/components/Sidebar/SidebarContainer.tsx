import React from 'react';
import {StoreType} from '../../redux/store';
import {Sidebar} from './Sidebar';

type SidebarPropsType = {
    store: StoreType
}

export function SidebarContainer(props: SidebarPropsType) {
    const startIndex = Math.floor(Math.random() * 4 + 1)
    console.log(startIndex)

    return (
        <Sidebar dialogsUsersData={props.store.getState().dialogsPage.dialogsUsersData}
                 startIndex={startIndex}/>
    )
}