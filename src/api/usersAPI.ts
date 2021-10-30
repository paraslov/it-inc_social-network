import {UserType} from '../redux/users_reducer/users_reducer';
import {APIResponseType, instance} from './api';

export type GetUserRequestType = {
    items: UserType[]
    totalCount: number
    error: string
}
export const usersAPI = {
    getUsers(pageNumber: number, pageSize: number) {
        return instance.get<GetUserRequestType>(`users?page=${pageNumber}&count=${pageSize}`).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data)
    }
}