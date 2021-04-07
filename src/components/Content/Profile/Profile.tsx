import React from 'react';
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ProfilePageType} from '../../../redux/state';


type ProfilePropsType = {
    profilePage: ProfilePageType
    addPost: () => void
    newPostTextChange: (newPostText: string) => void
}

function Profile(props: ProfilePropsType) {
    return (
        <main className={s.main_content}>
            <ProfileInfo/>
            <MyPosts profilePage={props.profilePage}
                     addPost={props.addPost}
                     newPostTextChange={props.newPostTextChange}/>
        </main>)
}

export default Profile