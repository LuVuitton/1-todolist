import {instance} from "./ToDoListsAPI";
import {GeneralResponseType} from "../Types";


export type PostLoginModelType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}

export type GetAuthResponseDataType = {
    id: number,
    email: string,
    login: string
}


export const authAPI = {

    login(email: string, password: string, rememberMe?: boolean, captcha?: boolean) {
        const PostLoginModel: PostLoginModelType = {email, password, captcha, rememberMe} // упаковал параметры в обьект
        return instance.post<GeneralResponseType<{ userId: number }>>('auth/login', PostLoginModel)
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