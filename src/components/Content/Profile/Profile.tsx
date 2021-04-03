import React from "react";
import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {PostMessageType} from '../../../index';

type ProfilePropsType = {
    postsMessagesData: Array<PostMessageType>
}

function Profile(props: ProfilePropsType) {
    return (
        <main className={s.main_content}>
            <ProfileInfo />
            <MyPosts postsMessagesData={props.postsMessagesData}/>
        </main>)
}

export default Profile