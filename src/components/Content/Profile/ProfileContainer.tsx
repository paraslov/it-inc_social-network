import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/store';
import {ProfileType, setUserProfileOnPage} from '../../../redux/profile_reducer';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';

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
        if (!this.props.isAuth) return <Redirect to={'/login'}/>
        return <Profile profile={this.props.profile}/>
    }
}

type MapDispatchType = {
    setUserProfileOnPage: (userId: number) => Function
}
type MapStateType = {
    profile: ProfileType | null
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

const ProfileContainerWithRouter = withRouter(ProfileContainer)

export default connect<MapStateType, MapDispatchType, {}, AppStateType>
(mapStateToProps, {setUserProfileOnPage})
(ProfileContainerWithRouter)