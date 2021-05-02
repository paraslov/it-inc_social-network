import React from 'react'
import {UserType} from '../../../../redux/users_reducer';
import s from '../Users.module.css'

type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
}

export const User: React.FC<UserPropsType> = ({user, ...restProps}) => {
    return (
        <div className={s.samurai}>
            <div>
                <div>
                    <img className={s.userPhoto} src={user.photoUrl} alt="user pic"/>
                </div>
                <div className={s.btn}>
                    {user.followed
                        ? <button onClick={() => restProps.unfollow(user.id)}>unfollow</button>
                        : <button onClick={() => restProps.follow(user.id)}>follow</button>}
                </div>
            </div>
            <div className={s.userInfo}>
                <div className={s.userInfoPart}>
                    <div>{user.fullName}</div>
                    <div>{user.status}</div>
                </div>
                <div className={s.userInfoPart}>
                    <div>{user.location.city}</div>
                    <div>{user.location.country}</div>
                </div>
            </div>
        </div>
    )
}