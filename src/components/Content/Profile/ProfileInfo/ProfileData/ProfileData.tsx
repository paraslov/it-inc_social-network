import React from 'react'
import s from '../ProfileInfo.module.css'
import {ContactsType, ProfileType} from '../../../../../redux/profile_reducer'

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
export const ProfileData: React.FC<TProfileDataProps> = (props) => {
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