import React, {ChangeEvent, useState} from 'react'
import s from './ProfileInfo.module.css'
import {ContactsType, ProfileType} from '../../../../redux/profile_reducer'
import {Preloader} from '../../../Common/Preloader/Preloader'
import samuraiPic from '../../../../assets/img/ava/ava.png'
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks'
import {Input, myCreateField, Textarea} from '../../../Common/FormControls/FormControls'
import {reduxForm} from 'redux-form'


type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    updateUserStatus: (status: string) => void
    saveAvatar: (file: File) => void
    updateProfile: (formData: ProfileType) => void
}

function ProfileInfo(props: PropsType) {
    const [editProfile, setEditProfile] = useState(false)

    if (!props.profile) {
        return <Preloader left={'40%'} top={'40%'} size={'200px'}/>
    }

    const onProfileFormSubmit = (formData: ProfileType) => {
        props.updateProfile(formData)
        setEditProfile(false)
    }

    return (
        <div>
            <div className={s.infoContent}>
                <img src={props.profile.photos.small || samuraiPic} alt="user ava"/>
                {editProfile ? <EditProfileForm profile={props.profile}
                                                onSubmit={onProfileFormSubmit}
                                                saveAvatar={props.saveAvatar}
                                                setEditProfile={setEditProfile}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} status={props.status}
                                   updateUserStatus={props.updateUserStatus}
                                   editProfileCallback={() => setEditProfile(true)}/>}
            </div>
        </div>
    )
}

type TContacts = {
    contactTitle: string
    contactValue: string | undefined
}

const Contacts: React.FC<TContacts> = ({contactTitle, contactValue}) => {
    return (
        <div>
            {contactValue && <span className={s.contactItem}><b>{contactTitle}</b>: {contactValue}</span>}
        </div>
    )
}

type TProfileDataProps = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateUserStatus: (status: string) => void
    editProfileCallback: () => void
}

const ProfileData: React.FC<TProfileDataProps> = (props) => {
    return (
        <div>
            {props.isOwner && <button onClick={props.editProfileCallback}>edit profile</button>}
            <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
            <div className={s.aboutMe}><b>About me:</b> {props.profile.aboutMe}</div>
            <div className={s.aboutMe}><b>Looking for a job:</b> {props.profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div className={s.aboutMe}><b>Job description:</b> {props.profile.lookingForAJobDescription}</div>
            <div className={s.aboutMe}><b>My name:</b> {props.profile.fullName}</div>
            <div className={s.aboutMe}><b>My contacts:</b>
                <div>
                    {Object.keys(props.profile.contacts).map(key =>
                        <Contacts contactTitle={key} key={key}
                                  contactValue={props.profile?.contacts[key as keyof ContactsType]}/>)}
                </div>
            </div>
        </div>
    )
}

type TProfileFormProps = {
    profile: ProfileType
    setEditProfile: (editProfile: boolean) => void
    saveAvatar: (file: File) => void
}

const EditProfileForm = reduxForm<ProfileType, TProfileFormProps>({form: 'editProfile'})((props) => {

    const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.saveAvatar(e.target.files[0])
        }
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.aboutMe}><b>Change avatar:</b>
                <input type="file" placeholder={'choose ava'} onChange={onChangeAvatar}/>
            </div>
            <div className={s.aboutMe}><b>About me:</b>
                {myCreateField('aboutMe', 'About me', Input, [])}
            </div>
            <div className={s.aboutMe}><b>Looking for a job:</b>
                {myCreateField('lookingForAJob', undefined, Input, [], {type: 'checkbox'})}
            </div>
            <div className={s.aboutMe}><b>Job description:</b>
                {myCreateField('lookingForAJobDescription', 'Your specialization', Textarea, [])}
            </div>
            <div className={s.aboutMe}><b>My name:</b>
                {myCreateField('fullName', 'Your name', Textarea, [])}
            </div>
            <div className={s.aboutMe}><b>My contacts:</b>
                <div>
                    {Object.keys(props.profile.contacts).map(key => <div className={s.aboutMe}>
                        <b>{key}</b>:
                        {myCreateField('contacts.' + key, key, Input, [])}
                    </div>)}
                </div>
            </div>
            <button type={'submit'}>Save</button>
            <button type={'button'} onClick={() => props.setEditProfile(false)}>Cancel</button>
        </form>
    )
})

export default ProfileInfo