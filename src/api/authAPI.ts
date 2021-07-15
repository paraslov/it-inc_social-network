import {APIResponseType, instance} from './api';

type AuthDataType = {
    id: number
    email: string
    login: string
}
type LoginDataType = {
    userId: number
}
export const authAPI = {
    getUserData() {
        return instance.get<APIResponseType<AuthDataType>>(`auth/me`).then(res => res.data)
    },
    loginUser(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<APIResponseType<LoginDataType>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logoutUser() {
        return instance.delete<APIResponseType>('auth/login').then(res => res.data)
    }
}