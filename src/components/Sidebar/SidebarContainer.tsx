import React from 'react';
import {Sidebar} from './Sidebar';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/store';
import {DialogUserType} from '../../redux/state';


const startIndex = Math.floor(Math.random() * 4 + 1)
console.log(startIndex)

type MapStateType = {
    dialogsUsersData: Array<DialogUserType>
    startIndex: number
}

function mapStateToProps(state: AppStateType) {
    return {
        dialogsUsersData: state.dialogsPage.dialogsUsersData,
        startIndex: startIndex
    }
}

export const SidebarContainer = connect<MapStateType, {}, {}, AppStateType>(mapStateToProps, {})(Sidebar)


