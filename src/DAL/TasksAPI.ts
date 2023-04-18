import {instance} from "./ToDoListsAPI";
import {GeneralResponseType, IncompleteOneTaskAPIType, OneTaskType, ResponseTasksType} from "../Types";


export const tasksAPI = {
    //axios заменил на созданый instance, как он работает описал в листАПИ

    getTasks(listID: string) {
        return instance.get<ResponseTasksType>(`/todo-lists/${listID}/tasks?count=20`)
    },
    postTask(listID: string, taskTitle: string) {
        return instance.post<GeneralResponseType<{item:IncompleteOneTaskAPIType}>>(`/todo-lists/${listID}/tasks`, {title: taskTitle})
            .then(r=>r.data)
    },
    deleteTask(listID: string, taskID: string) {
        return instance.delete<GeneralResponseType>(`/todo-lists/${listID}/tasks/${taskID}`)
            .then(r=>r.data)
    },
    updateTask(listID:string, taskID:string, updatedTask:OneTaskType) {
        return instance.put<GeneralResponseType<IncompleteOneTaskAPIType>>(`todo-lists/${listID}/tasks/${taskID}`, updatedTask )
            .then(r=>r.data)
    }
}