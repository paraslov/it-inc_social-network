import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {profileActions, ProfileType} from '../../../redux/profile_reducer';
import axios from 'axios';


class ProfileContainer extends React.Component<ProfileContainerPropsType, AppStateType> {

    componentDidMount() {
        axios.get<ProfileType>('https://social-network.samuraijs.com/api/1.0/profile/13100').
        then(response => {
            console.log(response.data)
            this.props.setUserProfile(response.data)
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
type ProfileContainerPropsType = MapStateType & MapDispatchType
const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        profile: state.profilePage.profile
    }
}

export default connect<MapStateType, MapDispatchType, {}, AppStateType>(mapStateToProps,
    {setUserProfile: profileActions.setUserProfile})
(ProfileContainer)