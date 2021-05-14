import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {profileActions, ProfileType} from '../../../redux/profile_reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {profileAPI} from '../../../api/api';

type PathParamsType = {
    userId: string
}
type ProfileContainerPropsType = MapStateType & MapDispatchType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<ProfileContainerPropsType, AppStateType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '13100'
        }
        profileAPI.getUserProfile(userId)
            .then(data => {
                this.props.setUserProfile(data)
            })
    }

    render() {
        return <Profile profile={this.props.profile}/>
    }
}

type MapDispatchType = {
    setUserProfile: (profile: ProfileType) => void
}
type MapStateType = {
    profile: ProfileType | null
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        profile: state.profilePage.profile
    }
}

const ProfileContainerWithRouter = withRouter(ProfileContainer)

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(mapStateToProps,
    {setUserProfile: profileActions.setUserProfile})
(ProfileContainerWithRouter)