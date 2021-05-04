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

export class Users extends React.Component<UsersPropsType> {

    constructor(props: UsersPropsType) {
        super(props);

        axios.get<GetUserRequestType>('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <div className={s.wrapper}>
                <div>
                    {this.props.users.map((u) => <User key={u.id} user={u}
                                                       follow={this.props.follow}
                                                       unfollow={this.props.unfollow}/>)}
                </div>
            </div>
        )
    }
}