import {IncompleteListAPIType, CheckStatus, IncompleteOneTaskAPIType} from "../../Types";
import {AllGlobalACType} from "../reducers/globalReducer";
import {changeEntityListStatusAC} from "../reducers/listReducers";
import {changeEntityTaskStatusAC} from "../reducers/taskReduser";

export type GeneralACType = GeneralACTaskType | GeneralACListType

export type GeneralACTaskType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof switchCheckboxAC>
    | ReturnType<typeof addEditedTaskAC>
    | ReturnType<typeof setAPITasksAC>
    | ReturnType<typeof setAPIListsAndArrToTasksAC>
    | ReturnType<typeof addListCreateEmptyTasksAC>
    | AllGlobalACType
    | ReturnType<typeof changeEntityTaskStatusAC>


export type GeneralACListType =
    | ReturnType<typeof addListCreateEmptyTasksAC>
    | ReturnType<typeof removeListAC>
    | ReturnType<typeof addEditedListTitleAC>
    | ReturnType<typeof setAPIListsAndArrToTasksAC>
    | AllGlobalACType
    | ReturnType<typeof changeEntityListStatusAC>



//AC
export const addListCreateEmptyTasksAC = (newList: IncompleteListAPIType) =>
    ({type: 'ADD-LIST-AND-CREATE-EMPTY-TASKS-ARR', payload: {newList: newList}} as const)

export const removeListAC = (listID: string) =>
    ({type: 'REMOVE-LIST', payload: {listID}} as const)

export const addEditedListTitleAC = (value: string, listID: string) =>
    ({type: 'ADD-EDITED-LIST-TITLE', payload: {value, listID}} as const)

export const addTaskAC = (newTask: IncompleteOneTaskAPIType) =>
    ({type: 'ADD-TASK', payload: {newTask}} as const)

export const removeTaskAC = (taskID: string, listID: string) =>
    ({type: 'REMOVE-TASK', payload: {taskID, listID}} as const)

export const switchCheckboxAC = (taskID: string, checked: CheckStatus, listID: string) =>
    ({type: 'SWITCH-TASKS-CHECKBOX', payload: {taskID, checked, listID}} as const)

export const addEditedTaskAC = (value: string, listID: string, taskID: string) =>
    ({type: 'ADD-EDITED-TASK', payload: {value, listID, taskID}} as const)


//AC API
export const setAPIListsAndArrToTasksAC = (lists: IncompleteListAPIType[], newListIDArr: string[]) =>
    ({type: 'SET-API-LISTS-AND-ARR-TO-TASKS', payload: {lists, newListIDArr}} as const)

export const setAPITasksAC = (tasksArr: IncompleteOneTaskAPIType[], listID: string) =>
    ({type: 'SET-API-TASKS-AC', payload: {tasksArr, listID}} as const)

