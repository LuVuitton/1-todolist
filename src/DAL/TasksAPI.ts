import {instance} from "./ToDoListsAPI";
import {GeneralResponseType, IncompleteOneTaskAPIType, OneTaskType, ResponseTasksType} from "../Types";




export const tasksAPI = {
    //axios заменил на созданый instance, как он работает описал в листАПИ

    getTasks(listID: string) {
        return instance.get<ResponseTasksType>(`/todo-lists/${listID}/tasks?count=20`)
            .then(r => r.data.items)
    },
    postTask(listID: string, taskTitle: string) {
        return instance.post<GeneralResponseType<{item:IncompleteOneTaskAPIType}>>(`/todo-lists/${listID}/tasks`, {title: taskTitle}).
            then(r=>r)
    },
    deleteTask(listID: string, taskID: string) {
        return instance.delete<GeneralResponseType>(`/todo-lists/${listID}/tasks/${taskID}`)
    },
    updateTask(listID:string, taskID:string, updatedTask:OneTaskType) {

        return instance.put<GeneralResponseType<IncompleteOneTaskAPIType>>(`todo-lists/${listID}/tasks/${taskID}`, updatedTask )
    }
}