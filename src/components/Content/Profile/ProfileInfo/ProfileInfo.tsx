import React, {useState} from 'react'
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../../redux/profile_reducer'
import {Preloader} from '../../../Common/Preloader/Preloader'
import samuraiPic from '../../../../assets/img/ava/ava.png'
import {ProfileStatusWithHooks} from './ProfileStatus/ProfileStatusWithHooks'
import {ProfileData} from './ProfileData/ProfileData'
import {EditProfileForm, TEditProfileFormFields} from './EditProfileForm/EditProfileForm'
import {SubmitHandler} from "react-hook-form";


type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateUserStatus: (status: string) => void
    saveAvatar: (file: File) => void
    updateProfile: (formData: TEditProfileFormFields) => void
}

function ProfileInfo(props: PropsType) {
    const [editProfile, setEditProfile] = useState(false)

    if (!props.profile) {
        return <Preloader left={'40%'} top={'40%'} size={'200px'}/>
    }

    const onProfileFormSubmit: SubmitHandler<TEditProfileFormFields> = (formData) => {
        props.updateProfile(formData)
        setEditProfile(false)
    }

    return (
        <div>
            <div className={s.infoContent}>
                <div className={s.profileHeader}>
                    <img src={props.profile.photos.small || samuraiPic} alt="user ava"/>
                    <div className={s.nameStatusBlock}>
                        <div className={s.name}><span>Hi, I'm </span>{props.profile.fullName}</div>
                        <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}
                                                isOwner={props.isOwner}/>
                    </div>
                    {props.isOwner && !editProfile &&
                    <button className={s.editProfileBtn} onClick={() => setEditProfile(true)}>Edit profile</button>}
                </div>
                {editProfile ? <EditProfileForm profile={props.profile}
                                                initialValues={props.profile}
                                                onSubmit={onProfileFormSubmit}
                                                saveAvatar={props.saveAvatar}
                                                setEditProfile={setEditProfile}/>
                    : <ProfileData profile={props.profile}/>}
            </div>
        </div>
    )
}

export default ProfileInfo
