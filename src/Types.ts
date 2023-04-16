import {StatusType} from "./redux/reducers/appReducer";


export type GeneralResponseType<D={}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: []
    data: D
}

export type ErrorResponseDataAPI = {
    //то что сюда класть переписываем из документации бэка
    //этот обьект формирует бэк и кладет его в респонс ошибки
    message:string
}

export type InputAddPropsType = {
    clickToAddTask: (inputValue: string) => void
    disabled?:boolean
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
    listStatus: StatusType
}


export type AllTasksType = {
    [key: string]: OneTaskType[] //ключ это айди туду листа
}



//тип перечисления, задаем какой либо статус в цифрах(значения)
// и описываем его именем свойства, что бы было понятно как с ним работать
export enum CheckStatus {
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

export enum ResulAPICode {
    Ok,
    Error,
    Captcha = 10,
}

export type ToDoListPropsType = {
    titleList: string,
    filter: FilterType
    toDoListID: string
    removeList: (toDoListId: string) => void
    entityStatus: StatusType


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
    checked: CheckStatus
    taskValue: string
    taskID: string
    onChangeHandler: (statusValue:CheckStatus) => void
    coverAddEditedTask: (value: string) => void
    removeTaskHandler: (taskID: string) => void
    entityStatus: StatusType
}

export type EditableSpanPropsType = {
    value: string
    callback:(value:string)=>void
    itemID: string
}

export type ResponseTasksType = {
    error: null | string
    items: IncompleteOneTaskAPIType[]
    totalCount: number
}


export type IncompleteOneTaskAPIType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: CheckStatus
    priority: PrioritiesForTask
    startDate: string
    deadline: string
    addedDate: string
}

export type OneTaskType = IncompleteOneTaskAPIType & {
    taskStatus: StatusType
}