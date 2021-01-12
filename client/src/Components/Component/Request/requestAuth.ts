import {User} from "../../../State/auth-reducer";
import {instance} from "./request";

type RequestUserType = {
    token: string
    message: string
}

export const requestAuth = {
    postLogin (user: User) {
        return instance.post<RequestUserType>('/api/auth/login', user)
    },

    postRegister (user: User) {
        return instance.post<RequestUserType>('/api/auth/register', user)
    },

    getToken () {
        return instance.get('/api/auth/').then(res => res.data)
    },

    removeToken () {
        return instance.delete('/api/auth/').then(res => res.data)
    }
}


