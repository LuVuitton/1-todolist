import {IncompleteListAPIType, CheckStatus, IncompleteOneTaskAPIType} from "../../Types";
import {
    GlobalRequestStatusType,
    setErrorMessageAC,
    setGlobalStatusAC, setIsInitializedAC
} from "../reducers/globalReducer";
import {setIsLoggedInAC} from "../reducers/authReducer";

export type GeneralMainACType = GeneralTaskACType | GeneralListACType

export type GeneralTaskACType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof switchCheckboxAC>
    | ReturnType<typeof addEditedTaskAC>
    | ReturnType<typeof setAPITasksAC>
    | ReturnType<typeof setAPIListsAndArrToTasksAC>
    | ReturnType<typeof addListCreateEmptyTasksAC>
    | GeneralGlobalACType
    | ReturnType<typeof setEntityTaskStatusAC>
    | ReturnType<typeof setEntityListStatusAC>


export type GeneralListACType =
    | ReturnType<typeof addListCreateEmptyTasksAC>
    | ReturnType<typeof removeListAC>
    | ReturnType<typeof addEditedListTitleAC>
    | ReturnType<typeof setAPIListsAndArrToTasksAC>
    | GeneralGlobalACType
    | ReturnType<typeof setEntityListStatusAC>
    | ReturnType<typeof setAPITasksAC>

export type GeneralGlobalACType =
    | ReturnType<typeof setGlobalStatusAC>
    | ReturnType<typeof setErrorMessageAC>
    | ReturnType<typeof setIsInitializedAC>


export type GeneralAuthACType =
    | GeneralGlobalACType
    | ReturnType<typeof setIsLoggedInAC>

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

export const setEntityTaskStatusAC = (entityID: string, listID: string, newStatus: GlobalRequestStatusType) =>
    ({type: 'CHANGE-ENTITY-TASK-STATUS', payload: {entityID, newStatus, listID}} as const)

export const setEntityListStatusAC = (entityID: string, newStatus: GlobalRequestStatusType) =>
    ({type: 'CHANGE-ENTITY-LIST-STATUS', payload: {entityID, newStatus,}} as const)


//AC API
export const setAPIListsAndArrToTasksAC = (lists: IncompleteListAPIType[], newListIDArr: string[]) =>
    ({type: 'SET-API-LISTS-AND-ARR-TO-TASKS', payload: {lists, newListIDArr}} as const)

export const setAPITasksAC = (tasksArr: IncompleteOneTaskAPIType[], listID: string) =>
    ({type: 'SET-API-TASKS-AC', payload: {tasksArr, listID}} as const)



