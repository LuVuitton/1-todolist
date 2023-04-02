
import {OneTaskType} from "./API-Functional/TasksAPI";

export type GeneralResponseType<D={}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: []
    data: D
}


export type InputAddPropsType = {
    clickToAddTask: (inputValue: string) => void
}

export type FilterType = 'all' | 'completed' | 'active';

export type incompleteListAPIType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type OneToDoListAPIType = incompleteListAPIType & {
    filter: FilterType
}


export type AllTasksType = {
    [key: string]: OneTaskType[] //ключ это айди туду листа
}



//тип перечисления, задаем какой либо статус в цифрах(значения)
// и описываем его именем свойства, что бы было понятно как с ним работать
export enum StatusesForTask {
    New,
    InProgress,
    Completed,
    Draft //черновик

}

export type ToDoListPropsType = {
    titleList: string,
    filter: FilterType
    toDoListID: string
    removeList: (toDoListId: string) => void


}

export type FilterButtonPropsType = {
    title: string
    callback: () => void
    cssClass: string
}

export type FilterButtonDataType = {
    id: string
    title: FilterType
}

export type TaskPropsType = {
    type: string
    checked: StatusesForTask
    taskValue: string
    taskID: string
    onChangeHandler: () => void
    coverAddEditedTask: (value: string, taskId: string) => void
    removeTaskHandler: (taskID: string) => void
}

export type EditableSpanPropsType = {
    value: string
    callback:(value:string, taskId:string)=>void
    itemID: string
}

