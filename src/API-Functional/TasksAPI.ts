import {instance} from "./ToDoListsAPI";
import {GeneralResponseType, StatusesForTask} from "../Types";

export type ResponseTasksType = {
    items: OneTaskType[]
    totalCount: number
    error: null | string
}


export type OneTaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: StatusesForTask
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}


export const tasksAPI = {
    //axios заменил на созданый instance, как он работает описал в листАПИ

    getTasks(listID: string) {
        return instance.get<ResponseTasksType>(`/todo-lists/${listID}/tasks?count=20`)
            .then(r => r.data.items)
    },
    postTask(listID: string, taskTitle: string) {
        return instance.post<GeneralResponseType<{item:OneTaskType}>>(`/todo-lists/${listID}/tasks`, {title: taskTitle}).
            then(r=>r.data.data.item)
    },
    deleteTask(listID: string, taskID: string) {
        return instance.delete<GeneralResponseType>(`/todo-lists/${listID}/tasks/${taskID}`)
    },
    updateTask(listID:string, taskID:string, updatedTask:OneTaskType) {

        return instance.put<any>(`todo-lists/${listID}/tasks/${taskID}`, updatedTask )
    }
}