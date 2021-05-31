import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfileType} from '../../../redux/profile_reducer';


type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
}

function Profile(props: PropsType) {
    return (
        <main className={s.main_content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateUserStatus = {props.updateUserStatus}
            />
            <MyPostsContainer/>
        </main>)
}

export default Profile