import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {getUserStatus, ProfileType, setUserProfileOnPage, updateUserStatus} from '../../../redux/profile_reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';

type PathParamsType = {
    userId: string
}
type ProfileContainerPropsType = MapStateType & MapDispatchType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        let userId = Number(this.props.match.params.userId)
        if (!userId) {
            if(this.props.authorizedUserId) {
                userId = this.props.authorizedUserId
            } else {
                this.props.history.push('/login')
            }
        }
        this.props.setUserProfileOnPage(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return <Profile profile={this.props.profile}
                        status={this.props.status}
                        updateUserStatus = {this.props.updateUserStatus}
        />
    }
}

type MapDispatchType = {
    setUserProfileOnPage: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
}
type MapStateType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
    }
}

export default compose<React.ComponentType>(
    //withAuthRedirect,
    connect<MapStateType, MapDispatchType, {}, AppStateType>
    (mapStateToProps, {setUserProfileOnPage, getUserStatus, updateUserStatus}),
    withRouter
)(ProfileContainer)

