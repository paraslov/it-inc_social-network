import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfileType} from '../../../redux/profile_reducer';


type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateUserStatus: (status: string) => void
    saveAvatar: (file: File) => void
    updateProfile: (formData: ProfileType) => void
}

function Profile(props: PropsType) {
    return (
        <main className={s.main_content}>
            <ProfileInfo profile={props.profile}
                         updateProfile={props.updateProfile}
                         status={props.status}
                         isOwner={props.isOwner}
                         updateUserStatus = {props.updateUserStatus}
                         saveAvatar = {props.saveAvatar}
            />
            <MyPostsContainer/>
        </main>)
}

export default Profile