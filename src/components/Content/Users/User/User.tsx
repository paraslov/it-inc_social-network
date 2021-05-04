import React from 'react'
import {UserType} from '../../../../redux/users_reducer';
import s from '../Users.module.css'
import defaultAva from '../../../../assets/img/ava/ava.png'

type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User: React.FC<UserPropsType> = ({user, ...restProps}) => {
    return (
        <div className={s.samurai}>
            <div>
                <div>
                    <img className={s.userPhoto} src={user.photos.small !== null ? user.photos.small : defaultAva} alt="user pic"/>
                </div>
                <div className={s.btn}>
                    {user.followed
                        ? <button onClick={() => restProps.unfollow(user.id)}>unfollow</button>
                        : <button onClick={() => restProps.follow(user.id)}>follow</button>}
                </div>
            </div>
            <div className={s.userInfo}>
                <div className={s.userInfoPart}>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div className={s.userInfoPart}>
                    <div>{"Samurai"}</div>
                    <div>{"Way"}</div>
                </div>
            </div>
        </div>
    )
}