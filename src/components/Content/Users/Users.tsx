import React from 'react'
import {UsersPropsType} from './UsersContainer';
import {User} from './User/User';
import s from './Users.module.css'
import axios from 'axios';
import {UserType} from '../../../redux/users_reducer';
import {AppStateType} from '../../../redux/store';

type GetUserRequestType = {
    items: UserType[]
    totalCount: number
    error: string
}

export class Users extends React.Component<UsersPropsType, AppStateType> {

    componentDidMount() {
        axios.get<GetUserRequestType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(200)
            })
    }

    onPageNumberClick = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get<GetUserRequestType>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount/this.props.pageSize)
        let pages: number[] = []
        for(let i=1; i<=pagesCount; i++) {
            pages.push(i)
        }
        return (
            <div className={s.wrapper}>
                <div>
                    {pages.map(p => <span
                        className={this.props.currentPage === p ? s.page+' '+s.currentPage : s.page}
                        onClick={() => this.onPageNumberClick(p)}
                    >{p}</span>)}
                </div>
                <div>
                    {this.props.users.map((u) => <User key={u.id} user={u}
                                                       follow={this.props.follow}
                                                       unfollow={this.props.unfollow}/>)}
                </div>
            </div>
        )
    }
}