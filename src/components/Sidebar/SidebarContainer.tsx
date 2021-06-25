import {Sidebar} from './Sidebar';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/store';
import {DialogUserType} from '../../redux/dialogs_reducer';


type MapStateType = {
    dialogsUsersData: Array<DialogUserType>
    startIndex: number
}
export type SidebarPropsType = MapStateType

const startIndex = Math.floor(Math.random() * 4 + 1)

function mapStateToProps(state: AppStateType): MapStateType {
    return {
        dialogsUsersData: state.dialogsPage.dialogsUsersData,
        startIndex: startIndex
    }
}

export const SidebarContainer = connect<MapStateType, {}, {}, AppStateType>(mapStateToProps, {})(Sidebar)


