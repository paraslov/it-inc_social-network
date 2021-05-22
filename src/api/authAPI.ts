import {APIResponseType, instance} from './api';

type LoginDataType = {
    id: number
    email: string
    login: string
}
export const authAPI = {
    getUserData() {
        return instance.get<APIResponseType<LoginDataType>>(`auth/me`).then(res => res.data)
    }
}