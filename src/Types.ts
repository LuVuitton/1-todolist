import {
    addArrTasksAC,
    addEditedListTitleAC, addEditedTaskAC,
    addListAC,
    addTaskAC,
    removeListAC,
    removeTaskAC,
    switchCheckboxAC
} from "./actionCreators/ActionCreators";

export type InputAddPropsType = {
    clickToAddTask: (inputValue: string) => void
}

export type FilterType = 'all' | 'completed' | 'active';

export type ToDoListOneType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type OneToDoListAPIType = ToDoListOneType & {
    filter: FilterType
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

export type AllTasksType = {
    [key: string]: OneTaskType[] //ключ это айди туду листа
}

export type ResponseTasksType = {
    items: OneTaskType[]
    totalCount: number
    error: null | string
}

//тип перечисления, задаем какой либо статус в цифрах(значения)
// и описываем его именем свойства, что бы было понятно как с ним работать
export enum StatusesForTask {
    New,
    InProgress,
    Completed,
    Draft //черновик

}

// export type ToDoListType = {
//     toDoListID: string
//     titleList: string
//     filter: FilterType
// }


// export type TasksType = {
//     [key: string]: Array<TaskType> //ключ это айди туду листа
// }


// export type TaskType = {
//     type: string,
//     checked: boolean,
//     taskValue: string,
//     taskID: string,
//
// }

export type ToDoListPropsType = {
    titleList: string,
    filter: FilterType
    toDoListID: string
    removeList: (toDoListId: string) => void


}

export type FilterButtonPropsType ={
    title:string
    callback: ()=> void
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

//reducers type
export type mainACTaskType =
    | addTaskACType
    | removeTaskACType
    | switchCheckboxACType
    | addEditedTaskACType
    | addArrTasksACType

export type mainACListType =
    | addListACType
    | removeListACType
    | addEditedListACTitleType

export type addListACType = ReturnType<typeof addListAC>
export type removeListACType = ReturnType<typeof removeListAC>
export type addEditedListACTitleType = ReturnType<typeof addEditedListTitleAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type switchCheckboxACType = ReturnType<typeof switchCheckboxAC>
export type addEditedTaskACType = ReturnType<typeof addEditedTaskAC>
export type addArrTasksACType = ReturnType<typeof addArrTasksAC>

