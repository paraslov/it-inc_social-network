import React from 'react'
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../../redux/profile_reducer';
import {Preloader} from '../../../Common/Preloader/Preloader';
import samuraiPic from '../../../../assets/img/ava/ava.png'

function ProfileInfo(props: { profile: ProfileType | null }) {
    if (!props.profile) {
        return <Preloader left={'40%'} top={'40%'} size={'200px'}/>
    }
    return (
        <div>
            <div className={s.infoContent}>
                <img src={props.profile.photos.small || samuraiPic} alt="user ava"/>
                <div className={s.aboutMe}>{props.profile.aboutMe}</div>
            </div>
        </div>
    )
}

export default ProfileInfo