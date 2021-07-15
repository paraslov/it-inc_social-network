import {ProfileType} from '../../../../../redux/profile_reducer'
import {reduxForm} from 'redux-form'
import React, {ChangeEvent} from 'react'
import s from '../ProfileInfo.module.css'
import {Input, myCreateField, Textarea} from '../../../../Common/FormControls/FormControls'
import {urlValidator} from '../../../../../utils/validators/validators'

type TEditProfileFormProps = {
    profile: ProfileType
    setEditProfile: (editProfile: boolean) => void
    saveAvatar: (file: File) => void
}
export const EditProfileForm = reduxForm<ProfileType, TEditProfileFormProps>({form: 'editProfile'})((props) => {

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
                        {myCreateField('contacts.' + key, key, Input, [urlValidator])}
                    </div>)}
                </div>
            </div>
            <button type={'submit'} className={s.editProfileBtn + ' ' + s.editMode}>Save</button>
            <button type={'button'} className={s.editProfileBtn + ' ' + s.editMode}
                    onClick={() => props.setEditProfile(false)}>Cancel
            </button>
        </form>
    )
})