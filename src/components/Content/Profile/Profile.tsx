import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {StoreType} from '../../../redux/store';


type ProfilePropsType = {
    store: StoreType
}

function Profile(props: ProfilePropsType) {
    return (
        <main className={s.main_content}>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </main>)
}

export default Profile