import axios from 'axios';
import {UserType} from '../redux/users_reducer';

type GetUserRequestType = {
    items: UserType[]
    totalCount: number
    error: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": '00162dc2-204e-4559-bcf6-6384570c4ef5'
    }
})

export const usersAPI = {
    getUsers(pageNumber: number, pageSize: number) {
        return instance.get<GetUserRequestType>(`users?page=${pageNumber}&count=${pageSize}`).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data)
    }
}