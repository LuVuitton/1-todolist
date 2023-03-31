import axios from "axios";
import {incompleteListAPIType} from "../Types";

export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '70ba2ec4-2ba1-411d-b8a2-7b24b30ac2ca'   //без ключа тоже работало
    }
}

export const instance = axios.create({ //позволяет создать шаблон для запросов, потом пишем вместо axios=>instance
    baseURL: 'https://social-network.samuraijs.com/api/1.1', // вставится втоматом, пишет только то что будет после '/toDoLists/tasks'...
    ...settings  //тоже поставится автоматом
})


export type ToDoListsResponseType<D={}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: []
    data: D
}


export const toDoListsAPI = {
    //инстанс выше
    getLists() {
        return instance.get<incompleteListAPIType[]>(`/todo-lists`).then((r) => r.data)
    },
    postList(title: string) {
        return instance.post<ToDoListsResponseType<{ item: ToDoListsResponseType }>>(`/todo-lists`, {title: title})
    },
    deleteList(listID: string) {
        return instance.delete<ToDoListsResponseType>(`/todo-lists/${listID}`)
    },
    renameList(listID: string, newListTitle: string) {
        return instance.put<ToDoListsResponseType>(`/todo-lists/${listID}`, {title: newListTitle})
    },

}