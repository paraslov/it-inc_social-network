import {ProfileType} from '../redux/profile_reducer';
import {instance} from './api';

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    }
}