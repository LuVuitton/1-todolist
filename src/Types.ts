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
export type ToDoListType = {
    toDoListID: string
    titleList: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: Array<TaskType> //ключ это айди туду листа
}


export type TaskType = {
    type: string,
    checked: boolean,
    taskValue: string,
    taskID: string,

}

export type ToDoListPropsType = {
    titleList: string,
    // tasks: Array<TaskType>,
    // removeTask: (id: string, toDoListId: string) => void,
    // changeFilter: (value: FilterType, toDoListId: string) => void,
    // addItem: (value: string, toDoListId: string) => void,
    // switchCheckbox: (taskId: string, checked: boolean, toDoListId: string) => void,
    filter: FilterType // fix to FilterType
    toDoListID: string
    removeList: (toDoListId: string) => void
    // addEditedTask: (toDoListId: string, value: string, taskId: string) => void
    // addEditedListTitle: (value: string, toDoListID: string) => void
    // filterButtonsData: FilterButtonDataType[]

}

export type FilterButtonPropsType ={
    // filter:FilterType
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
    checked: boolean
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

