import React from 'react'
import {UsersPropsType} from './UsersContainer';
import {User} from './User/User';
import s from './Users.module.css'


export function Users(props: UsersPropsType) {

    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                fullName: 'Rino',
                status: 'Hi! I\'m a junior samurai',
                photoUrl: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/99/EP2402-CUSA05624_00-AV00000000000234/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=330&h=330',
                followed: true,
                location: {
                    country: 'Belarus',
                    city: 'Minsk'
                }
            },
            {
                id: 2,
                fullName: 'Ubikashi',
                status: 'Hi! I\'m a middle samurai',
                photoUrl: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/99/EP2402-CUSA05624_00-AV00000000000234/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=330&h=330',
                followed: false,
                location: {
                    country: 'Belarus',
                    city: 'Minsk'
                }
            },
            {
                id: 3,
                fullName: 'David',
                status: 'Hi! I\'m a senior samurai',
                photoUrl: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/99/EP2402-CUSA05624_00-AV00000000000234/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=330&h=330',
                followed: true,
                location: {
                    country: 'Japan',
                    city: 'Tokyo'
                }
            },
        ],)
    }

    const samurais = props.users.map((u) => <User user={u}
                                                  follow={props.follow}
                                                  unfollow={props.unfollow}
                                                  setUsers={props.setUsers}/>)

    return (
        <div className={s.wrapper}>
            <div>
                {samurais}
            </div>
        </div>
    )
}