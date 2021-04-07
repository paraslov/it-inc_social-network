import React from 'react';
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {PostMessageType, ProfilePageType} from '../../../redux/state';


type ProfilePropsType = {
    profilePage: ProfilePageType
    addPost: (newPostText: string) => void
}

function Profile(props: ProfilePropsType) {
    return (
        <main className={s.main_content}>
            <ProfileInfo/>
            <MyPosts postsMessagesData={props.profilePage.postsMessagesData}
                     addPost={props.addPost}/>
        </main>)
}

export default Profile