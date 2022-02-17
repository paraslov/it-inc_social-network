//* Users functional component =======================================================================================>>
import {UserType} from '../../../../redux/users_reducer/users_reducer'
import React from 'react'
import s from '../Users.module.css'
import {NavLink} from 'react-router-dom'
import defaultAva from '../../../../assets/img/ava/ava.png'

type UserPropsType = {
    user: UserType
    followUnfollowInProgress: number[]
    followUser: (userId: number) => void
    unFollowUser: (userId: number) => void
}
export const User: React.FC<UserPropsType> = ({user, ...restProps}) => {
    return (
        <div className={s.samurai}>
            <div>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img className={s.userPhoto}
                             src={user.photos.small !== null ? user.photos.small : defaultAva}
                             alt="user pic"
                        />
                    </NavLink>
                </div>
                <div className={s.btn}>
                    {user.followed
                        ? <button disabled={restProps.followUnfollowInProgress.some(id => id === user.id)}
                                  onClick={() => restProps.unFollowUser(user.id)}>unfollow</button>
                        : <button disabled={restProps.followUnfollowInProgress.some(id => id === user.id)}
                                  onClick={() => restProps.followUser(user.id)}>follow</button>}
                </div>
            </div>
            <div className={s.userInfo}>
                <div className={s.userInfoPart}>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div className={s.userInfoPart}>
                    <div>{'Samurai'}</div>
                    <div>{'Way'}</div>
                </div>
            </div>
        </div>
    )
}
