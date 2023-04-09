import {instance} from "./ToDoListsAPI";
import {GeneralResponseType} from "../Types";




export type AuthDataType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: boolean
}


export type GetAuthResponseDataType = {
    id: number,
    email: string,
    login: string
}


export const authAPI = {

    login(data:AuthDataType) {
        return instance.post<GeneralResponseType<{ userId: number }>>('auth/login', data)
            .then(r => r.data)
    },

    checkLogin() {
        return instance.get<GeneralResponseType<GetAuthResponseDataType>>('/auth/me')
            .then(r=>r.data)
    },

    logout() {
        return instance.delete<GeneralResponseType>('/auth/login')
            .then(r=>r.data)
    }


}