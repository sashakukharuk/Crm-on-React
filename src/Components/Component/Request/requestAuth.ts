import {User} from "../../../State/auth-reducer";
import {instance} from "./request";


type RequestUserType = {
    token: string
    message: string
}

export const requestAuth = {
    postLogin (user: User) {
        return instance.post<RequestUserType>('auth/login', user).then(res => res.data)
    },

    postRegister (user: User) {
        return instance.post<RequestUserType>('auth/register', user).then(res => res.data)
    },

    getToken () {
        return instance.get('auth/').then(res => res.data)
    },

    removeToken () {
        return instance.delete('auth/').then(res => res.data)
    }
}


