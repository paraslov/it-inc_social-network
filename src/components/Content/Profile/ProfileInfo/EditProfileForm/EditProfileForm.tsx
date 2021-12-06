import {ContactsType, ProfileType} from '../../../../../redux/profile_reducer'
import React, {ChangeEvent} from 'react'
import s from '../ProfileInfo.module.css'
import {useForm} from "react-hook-form";

type TEditProfileFormProps = {
  profile: ProfileType
  setEditProfile: (editProfile: boolean) => void
  saveAvatar: (file: File) => void
  initialValues: ProfileType
  onSubmit: (formData: TEditProfileFormFields) => void
}

export type TEditProfileFormFields = {
  aboutMe: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType;
}

export const EditProfileForm: React.FC<TEditProfileFormProps> =
  (({profile, setEditProfile, saveAvatar, initialValues, onSubmit}) => {

  const {register, handleSubmit, watch, formState: {errors}} = useForm<TEditProfileFormFields>({
    defaultValues: {
      aboutMe: initialValues.aboutMe,
      fullName: initialValues.fullName,
      lookingForAJobDescription: initialValues.lookingForAJobDescription,
      lookingForAJob: initialValues.lookingForAJob,
      contacts: initialValues.contacts,
    },
  });

  console.log(watch("fullName")) // watch input value by passing the name of it


  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      saveAvatar(e.target.files[0])
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <input type="text" placeholder={'Tell about yourself'} {...register('aboutMe')}/>
      </div>
      <div className={s.aboutMe}><b>Looking for a job:</b>
        <input type="checkbox" {...register('lookingForAJob')}/>
      </div>
      <div className={s.aboutMe}><b>Job description:</b>
        <input type="text" placeholder={'Your specialization'} {...register('lookingForAJobDescription')}/>
      </div>
      <div className={s.aboutMe}><b>My name:</b>
        <input type="text" placeholder={'Your name'} {...register('fullName')}/>
      </div>
      <div className={s.aboutMe}><b>My contacts:</b>
        <div>
          {Object.keys(profile.contacts).map(key => <div className={s.aboutMe} key={key}>
            <b>{key}</b>:
            <input type="text" {...register('contacts.'+key as any)} placeholder={key} />
          </div>)}
        </div>
      </div>
      <button type={'submit'} className={s.editProfileBtn + ' ' + s.editMode}>Save</button>
      <button type={'button'} className={s.editProfileBtn + ' ' + s.editMode}
              onClick={() => setEditProfile(false)}>
        Cancel
      </button>
    </form>
  )
})
