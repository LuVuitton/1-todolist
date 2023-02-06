import {addEditedListTitleAC, addListAC, changeFilterListAC, removeListAC} from "./reducers/listReducers";
import {addArrTasksAC, addEditedTaskAC, addTaskAC, removeTaskAC, switchCheckboxAC} from "./reducers/taskReduser";

export type FilterType = 'all' | 'completed' | 'active';
export type ToDoListType = {
    toDoListID: string
    titleList: string
    filter: any                         //пофиксить эни
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
    tasks: Array<TaskType>,
    removeTask: (id: string, toDoListId: string) => void,
    changeFilter: (value: FilterType, toDoListId: string) => void,
    addItem: (value: string, toDoListId: string) => void,
    switchCheckbox: (taskId: string, checked: boolean, toDoListId: string) => void,
    filter: FilterType
    toDoListID: string
    removeList: (toDoListId: string) => void
    addEditedTask: (toDoListId: string, value: string, taskId: string) => void
    addEditedListTitle: (value: string, toDoListID: string) => void

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
    | changeFilterListACType;

export type addListACType = ReturnType<typeof addListAC>
export type removeListACType = ReturnType<typeof removeListAC>
export type addEditedListACTitleType = ReturnType<typeof addEditedListTitleAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type switchCheckboxACType = ReturnType<typeof switchCheckboxAC>
export type addEditedTaskACType = ReturnType<typeof addEditedTaskAC>
export type addArrTasksACType = ReturnType<typeof addArrTasksAC>
export type changeFilterListACType = ReturnType<typeof changeFilterListAC>

