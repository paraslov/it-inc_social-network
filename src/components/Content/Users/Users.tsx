import React from 'react'
import {UsersPropsType} from './UsersContainer';
import {User} from './User/User';
import s from './Users.module.css'
import axios from 'axios';
import {UserType} from '../../../redux/users_reducer';

type GetUserRequestType = {
    items: UserType[]
    totalCount: number
    error: string
}

export function Users(props: UsersPropsType) {

    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get<GetUserRequestType>('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                    props.setUsers(response.data.items)
                })
        }
    }

    const samurais = props.users.map((u) => <User key={u.id} user={u}
                                                  follow={props.follow}
                                                  unfollow={props.unfollow}/>)

    return (
        <div className={s.wrapper}>
            <button onClick={getUsers}>Get Users</button>
            <div>
                {samurais}
            </div>
        </div>
    )
}