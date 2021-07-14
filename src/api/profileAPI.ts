import {ProfileType} from '../redux/profile_reducer'
import {APIResponseType, instance} from './api'

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateUserStatus(status: string) {
        return instance.put<APIResponseType>('profile/status', {status}).then(res => res.data)
    },
    saveAvatar(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.post('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    }
}