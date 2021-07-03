import React from 'react'
import {UserType} from '../../../../redux/users_reducer'
import s from '../Users.module.css'
import {User} from './User'
import {Paginator} from '../../../Common/Paginator/Paginator'

//* Users functional component =======================================================================================>>
type UsersPropsType = {
    users: UserType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followUnfollowInProgress: number[]
    onPageNumberClick: (pageNumber: number) => void
    follow: (userId: number) => Function
    unfollow: (userId: number) => Function
}

export function Users(props: UsersPropsType) {
    return (
        <div className={s.wrapper}>
            <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
                       currentPage={props.currentPage} onPageNumberClick={props.onPageNumberClick} />
            <div>
                {props.users.map((u) => <User key={u.id}
                                              user={u}
                                              followUnfollowInProgress={props.followUnfollowInProgress}
                                              follow={props.follow}
                                              unfollow={props.unfollow}/>)}
            </div>
        </div>
    )
}

