import React, {ChangeEvent} from 'react'
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../../redux/profile_reducer';
import {Preloader} from '../../../Common/Preloader/Preloader';
import samuraiPic from '../../../../assets/img/ava/ava.png'
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';


type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateUserStatus: (status: string) => void
    saveAvatar: (file: File) => void
}
function ProfileInfo(props: PropsType) {
    if (!props.profile) {
        return <Preloader left={'40%'} top={'40%'} size={'200px'}/>
    }

    const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            props.saveAvatar(e.target.files[0])
        }
    }

    return (
        <div>
            <div className={s.infoContent}>
                <img src={props.profile.photos.small || samuraiPic} alt="user ava"/>
                {props.isOwner && <div className={s.aboutMe}>
                    <input type="file" placeholder={'choose ava'} onChange={onChangeAvatar}/>
                </div>}
                <div className={s.aboutMe}>{props.profile.aboutMe}</div>
                <div className={s.aboutMe}>{props.profile.lookingForAJobDescription}</div>
                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo