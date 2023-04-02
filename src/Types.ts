

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

export type IncompleteListAPIType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type OneToDoListAPIType = IncompleteListAPIType & {
    filter: FilterType
}


export type AllTasksType = {
    [key: string]: OneTaskType[] //ключ это айди туду листа
}



//тип перечисления, задаем какой либо статус в цифрах(значения)
// и описываем его именем свойства, что бы было понятно как с ним работать
export enum checkStatus {
    New,
    InProgress,
    Completed,
    Draft //черновик

}

export enum PrioritiesForTask {
    Low,
    Middle,
    High,
    Urgently,
    Later
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
    checked: checkStatus
    taskValue: string
    taskID: string
    onChangeHandler: (statusValue:checkStatus) => void
    coverAddEditedTask: (value: string) => void
    removeTaskHandler: (taskID: string) => void
}

export type EditableSpanPropsType = {
    value: string
    callback:(value:string)=>void
    itemID: string
}

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
    status: checkStatus
    priority: PrioritiesForTask
    startDate: string
    deadline: string
    addedDate: string
}