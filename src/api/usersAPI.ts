import {UserType} from '../redux/users_reducer/users_reducer';
import {APIResponseType, instance} from './api';

export type GetUserRequestType = {
    items: UserType[]
    totalCount: number
    error: string
}
export const usersAPI = {
    getUsers(payload: IGetUsersRequest) {
        const {pageNumber, pageSize, friend = null, term = ''} = payload
        const url = `users?page=${pageNumber}&count=${pageSize}&term=${term}&friend=${friend}`
        return instance.get<GetUserRequestType>(url).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data)
    }
}

export interface IGetUsersRequest {
    pageNumber: number,
    pageSize: number,
    term?: string,
    friend?: null | true,
}
