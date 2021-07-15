import {instance} from './api'

type TCaptchaRequest = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<TCaptchaRequest>('security/get-captcha-url').then(res => res.data)
    }
}