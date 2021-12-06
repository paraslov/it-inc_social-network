import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {
    getUserStatus,
    ProfileType,
    saveAvatar,
    setUserProfileOnPage, updateProfile,
    updateUserStatus
} from '../../../redux/profile_reducer'
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect'
import {TEditProfileFormFields} from "./ProfileInfo/EditProfileForm/EditProfileForm";

type PathParamsType = {
    userId: string
}
type ProfileContainerPropsType = MapStateType & MapDispatchType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    refreshProfile() {
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
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return <Profile profile={this.props.profile}
                        status={this.props.status}
                        isOwner={!this.props.match.params.userId}
                        updateUserStatus = {this.props.updateUserStatus}
                        updateProfile={this.props.updateProfile}
                        saveAvatar = {this.props.saveAvatar}
        />
    }
}

type MapDispatchType = {
    setUserProfileOnPage: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    saveAvatar: (file: File) => void
    updateProfile: (formData: TEditProfileFormFields) => void
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
    withAuthRedirect,
    connect<MapStateType, MapDispatchType, {}, AppStateType>
    (mapStateToProps, {setUserProfileOnPage, getUserStatus, updateUserStatus, saveAvatar, updateProfile}),
    withRouter
)(ProfileContainer)

