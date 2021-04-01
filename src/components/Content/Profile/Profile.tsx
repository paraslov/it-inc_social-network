import React from "react";
import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile() {
    return (
        <main className={s.main_content}>
            <ProfileInfo />
            <MyPosts/>
        </main>)
}

export default Profile