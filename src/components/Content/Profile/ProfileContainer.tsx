import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {ProfileType, setUserProfileOnPage} from '../../../redux/profile_reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../../hoc/withAuthRedirect';

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
        this.props.setUserProfileOnPage(Number(userId))
    }

    render() {
        return <Profile profile={this.props.profile}/>
    }
}

type MapDispatchType = {
    setUserProfileOnPage: (userId: number) => Function
}
type MapStateType = {
    profile: ProfileType | null
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        profile: state.profilePage.profile,
    }
}

const ProfileContainerWithRouter = withRouter(ProfileContainer)

export default withAuthRedirect(connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapStateToProps, {setUserProfileOnPage})
(ProfileContainerWithRouter))