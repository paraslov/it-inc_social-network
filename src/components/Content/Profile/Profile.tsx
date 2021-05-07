import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfileType} from '../../../redux/profile_reducer';



function Profile(props: {profile: ProfileType | null}) {
    return (
        <main className={s.main_content}>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </main>)
}

export default Profile