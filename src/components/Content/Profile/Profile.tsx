import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';


function Profile() {
    return (
        <main className={s.main_content}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </main>)
}

export default Profile