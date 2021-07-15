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
                <div className={s.profileHeader}>
                    <img src={props.profile.photos.small || samuraiPic} alt="user ava"/>
                    <div className={s.nameStatusBlock}>
                        <div className={s.name}>{props.profile.fullName}</div>
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

type TContacts = {
    contactTitle: string
    contactValue: string | undefined
}

const Contacts: React.FC<TContacts> = ({contactTitle, contactValue}) => {
    return (
        <div>
            {contactValue &&
            <span className={s.contactItem}><b>{contactTitle}</b>:
                <a href={contactValue} target={'_blank'} title={'contact ref'}>{contactValue}</a>
            </span>}
        </div>
    )
}

type TProfileDataProps = {
    profile: ProfileType
}

const ProfileData: React.FC<TProfileDataProps> = (props) => {
    return (
        <div>
            <div className={s.aboutMe}><b>About me:</b> {props.profile.aboutMe}</div>
            <div className={s.aboutMe}><b>Looking for a job:</b> {props.profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div className={s.aboutMe}><b>Job description:</b> {props.profile.lookingForAJobDescription}</div>
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
                <label className={s.changeAvatar} htmlFor={'i1'}>
                    Choose avatar
                    <input type="file"
                          id={'i1'}
                          style={{width: 0}}
                          placeholder={'choose ava'}
                          onChange={onChangeAvatar}/>
                </label>
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
            <button type={'submit'} className={s.editProfileBtn+' '+s.editMode}>Save</button>
            <button type={'button'} className={s.editProfileBtn+' '+s.editMode}
                    onClick={() => props.setEditProfile(false)}>Cancel</button>
        </form>
    )
})

export default ProfileInfo