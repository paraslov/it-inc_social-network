import React from 'react'
import {UserType} from '../../../../redux/users_reducer';
import s from '../Users.module.css'
import defaultAva from '../../../../assets/img/ava/ava.png'
import {NavLink} from 'react-router-dom';
import {usersAPI} from '../../../../api/api';

//* Users functional component =======================================================================================>>
type UsersPropsType = {
    users: UserType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageNumberClick: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export function Users(props: UsersPropsType) {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div className={s.wrapper}>
            <div>
                {pages.map(p => <span
                    className={props.currentPage === p ? s.page + ' ' + s.currentPage : s.page}
                    onClick={() => props.onPageNumberClick(p)}
                >{p}</span>)}
            </div>
            <div>
                {props.users.map((u) => <User key={u.id} user={u}
                                              follow={props.follow}
                                              unfollow={props.unfollow}/>)}
            </div>
        </div>
    )
}

//* Users functional component =======================================================================================>>
type UserPropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: React.FC<UserPropsType> = ({user, ...restProps}) => {
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
                        ? <button onClick={() => {
                            usersAPI.unfollow(user.id)
                                .then(data => {
                                if (data.resultCode === 0) {
                                    restProps.unfollow(user.id)
                                }
                            })
                        }}>unfollow</button>
                        : <button onClick={() => {
                            usersAPI.follow(user.id)
                                .then(data => {
                                if (data.resultCode === 0) {
                                    restProps.follow(user.id)
                                }
                            })
                        }}>follow</button>}
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