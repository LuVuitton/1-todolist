import {IncompleteListAPIType, OneTaskType, checkStatus} from "../../Types";

export type AllACTypes = mainACTaskType | mainACListType

export type mainACTaskType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof switchCheckboxAC>
    | ReturnType<typeof addEditedTaskAC>
    | ReturnType<typeof setAPITasksAC>
    | ReturnType<typeof setAPIListsAndArrToTasksAC>
    | ReturnType<typeof addListCreateEmptyTasksAC>

export type mainACListType =
    | ReturnType<typeof addListCreateEmptyTasksAC>
    | ReturnType<typeof removeListAC>
    | ReturnType<typeof addEditedListTitleAC>
    | ReturnType<typeof setAPIListsAndArrToTasksAC>


//AC
export const addListCreateEmptyTasksAC = (newList: IncompleteListAPIType) =>
    ({type: 'ADD-LIST-AND-CREATE-EMPTY-TASKS-ARR', payload: {newList:newList}} as const)

export const removeListAC = (listID: string) =>
    ({type: 'REMOVE-LIST', payload: {listID}} as const)

export const addEditedListTitleAC = (value: string, listID: string) =>
    ({type: 'ADD-EDITED-LIST-TITLE', payload: {value, listID}} as const)

export const addTaskAC = (newTask: OneTaskType) =>
    ({type: 'ADD-TASK', payload: {newTask}} as const)

export const removeTaskAC = (taskID: string, listID: string) =>
    ({type: 'REMOVE-TASK', payload: {taskID, listID}} as const)

export const switchCheckboxAC = (taskID: string, checked: checkStatus, listID: string) =>
    ({type: 'SWITCH-TASKS-CHECKBOX', payload: {taskID, checked, listID}} as const)

export const addEditedTaskAC = (value: string, listID: string, taskID: string) =>
    ({type: 'ADD-EDITED-TASK', payload: {value, listID, taskID}} as const)


//AC API
export const setAPIListsAndArrToTasksAC = (lists: IncompleteListAPIType[], newListIDArr: string[]) =>
    ({type: 'SET-API-LISTS-AND-ARR-TO-TASKS', payload: {lists, newListIDArr}} as const)

export const setAPITasksAC = (tasksArr: OneTaskType[], listID: string) =>
    ({type: 'SET-API-TASKS-AC', payload: {tasksArr, listID}} as const)

