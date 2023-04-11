import {CheckStatus, IncompleteOneTaskAPIType} from "../../Types";
import {
    GlobalRequestStatusType,
    setErrorMessageAC,
    setGlobalStatusAC, setIsInitializedAC
} from "../reducers/globalReducer";
import {setIsLoggedInAC} from "../reducers/authReducer";
import {
    addEditedListTitleAC, addListCreateEmptyTasksAC, clearAllStateAC,
    removeListAC,
    setAPIListsAndArrToTasksAC,
    setEntityListStatusAC
} from "../reducers/listReducers";

export type GeneralACType = GeneralTaskACType | GeneralListACType
type SetAPITasksACType = ReturnType<typeof setAPITasksAC>
// type SetAPIListsAndArrToTasksACType = ReturnType<typeof setAPIListsAndArrToTasksAC>
type AddListCreateEmptyTasksACType = ReturnType<typeof addListCreateEmptyTasksAC>
// type SetEntityListStatusACType = ReturnType<typeof setEntityListStatusAC>
type ClearAllStateType = ReturnType<typeof clearAllStateAC>


export type GeneralTaskACType =
    | SetAPITasksACType
    | ReturnType<typeof setAPIListsAndArrToTasksAC>
    | AddListCreateEmptyTasksACType
    | GeneralGlobalACType
    | ReturnType<typeof setEntityListStatusAC>
    | ClearAllStateType
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof switchCheckboxAC>
    | ReturnType<typeof addEditedTaskAC>
    | ReturnType<typeof setEntityTaskStatusAC>

export type GeneralListACType =
    | AddListCreateEmptyTasksACType
    | ReturnType<typeof setAPIListsAndArrToTasksAC>
    | GeneralGlobalACType
    | ReturnType<typeof setEntityListStatusAC>
    | SetAPITasksACType
    | ClearAllStateType
    | ReturnType<typeof removeListAC>
    | ReturnType<typeof addEditedListTitleAC>

export type GeneralGlobalACType =
    | ReturnType<typeof setGlobalStatusAC>
    | ReturnType<typeof setErrorMessageAC>
    | ReturnType<typeof setIsInitializedAC>

export type GeneralAuthACType =
    | GeneralGlobalACType
    | ReturnType<typeof setIsLoggedInAC>

//AC
// export const clearAllStateAC = () => ({type: 'CLEAR-ALL-STATE'} as const)

// export const addListCreateEmptyTasksAC = (newList: IncompleteListAPIType) =>
//     ({type: 'ADD-LIST-AND-CREATE-EMPTY-TASKS-ARR', payload: {newList: newList}} as const)

// export const removeListAC = (listID: string) =>
//     ({type: 'REMOVE-LIST', payload: {listID}} as const)

// export const addEditedListTitleAC = (value: string, listID: string) =>
//     ({type: 'ADD-EDITED-LIST-TITLE', payload: {value, listID}} as const)

// export const setEntityListStatusAC = (entityID: string, newStatus: GlobalRequestStatusType) =>
//     ({type: 'CHANGE-ENTITY-LIST-STATUS', payload: {entityID, newStatus,}} as const)

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

// const setAPIListsAndArrToTasksAC = (lists: IncompleteListAPIType[], newListIDArr: string[]) =>
//     ({type: 'SET-API-LISTS-AND-ARR-TO-TASKS', payload: {lists, newListIDArr}} as const)

//AC API

export const setAPITasksAC = (tasksArr: IncompleteOneTaskAPIType[], listID: string) =>
    ({type: 'SET-API-TASKS-AC', payload: {tasksArr, listID}} as const)



