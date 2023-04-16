export {}
// import {setErrorMessageAC, setGlobalStatusAC, setIsInitializedAC} from "../reducers/appReducer";
// import {setIsLoggedInAC} from "../reducers/authReducer";
// import {
//     removeListAC,
//     addEditedListTitleAC, addListCreateEmptyTasksAC,
//     setEntityListStatusAC, setAPIListsAndArrToTasksAC,
// } from "../reducers/listReducers";
// import {
//     addEditedTaskAC, switchCheckboxAC,
//     removeTaskAC, setAPITasksAC,
//     setEntityTaskStatusAC, addTaskAC,
// } from "../reducers/taskReduser";
//
// // export type GeneralACType = GeneralTaskACType | GeneralListACType
// export type GeneralACType = GeneralTaskACType | GeneralListACType
//
// // type SetAPITasksACType = ReturnType<typeof setAPITasksAC>
// // type AddListCreateEmptyTasksACType = ReturnType<typeof addListCreateEmptyTasksAC>
// // type SetAPIListsAndArrToTasksACType = ReturnType<typeof setAPIListsAndArrToTasksAC>
// // type SetEntityListStatusACType =ReturnType<typeof setEntityListStatusAC>
//
// export type GeneralTaskACType =
//     // | ReturnType<typeof addTaskAC>
//     // | ReturnType<typeof removeTaskAC>
//     // | ReturnType<typeof switchCheckboxAC>
//     // | ReturnType<typeof addEditedTaskAC>
//     // | ReturnType<typeof setEntityTaskStatusAC>
//     // | SetAPIListsAndArrToTasksACType
//     // | SetEntityListStatusACType
//     // | AddListCreateEmptyTasksACType
//     | GeneralGlobalACType
//     // | SetAPITasksACType
//
// export type GeneralListACType =
//     // | ReturnType<typeof removeListAC>
//     // | ReturnType<typeof addEditedListTitleAC>
//     // | SetAPIListsAndArrToTasksACType
//     // | SetEntityListStatusACType
//     // | AddListCreateEmptyTasksACType
//     | GeneralGlobalACType
//     // | SetAPITasksACType
//
// export type GeneralGlobalACType =
//     | ReturnType<typeof setGlobalStatusAC>
//     | ReturnType<typeof setErrorMessageAC>
//     | ReturnType<typeof setIsInitializedAC>
//
// export type GeneralAuthACType =
//     // | ReturnType<typeof setIsLoggedInAC>
//     | GeneralGlobalACType
//
// //AC
// // export const clearAllStateAC = () => ({type: 'CLEAR-ALL-STATE'} as const)
// // export const addListCreateEmptyTasksAC = (newList: IncompleteListAPIType) =>
// //     ({type: 'ADD-LIST-AND-CREATE-EMPTY-TASKS-ARR', payload: {newList: newList}} as const)
// // export const removeListAC = (listID: string) =>
// //     ({type: 'REMOVE-LIST', payload: {listID}} as const)
// // export const addEditedListTitleAC = (value: string, listID: string) =>
// //     ({type: 'ADD-EDITED-LIST-TITLE', payload: {value, listID}} as const)
// // export const setEntityListStatusAC = (entityID: string, newStatus: GlobalRequestStatusType) =>
// //     ({type: 'CHANGE-ENTITY-LIST-STATUS', payload: {entityID, newStatus,}} as const)
// // export const addTaskAC = (newTask: IncompleteOneTaskAPIType) =>
// //     ({type: 'ADD-TASK', payload: {newTask}} as const)
// // export const removeTaskAC = (taskID: string, listID: string) =>
// //     ({type: 'REMOVE-TASK', payload: {taskID, listID}} as const)
// // export const switchCheckboxAC = (taskID: string, checked: CheckStatus, listID: string) =>
// //     ({type: 'SWITCH-TASKS-CHECKBOX', payload: {taskID, checked, listID}} as const)
// // export const addEditedTaskAC = (value: string, listID: string, taskID: string) =>
// //     ({type: 'ADD-EDITED-TASK', payload: {value, listID, taskID}} as const)
// // export const setEntityTaskStatusAC = (entityID: string, listID: string, newStatus: GlobalRequestStatusType) =>
// //     ({type: 'CHANGE-ENTITY-TASK-STATUS', payload: {entityID, newStatus, listID}} as const)
// // const setAPIListsAndArrToTasksAC = (lists: IncompleteListAPIType[], newListIDArr: string[]) =>
// //     ({type: 'SET-API-LISTS-AND-ARR-TO-TASKS', payload: {lists, newListIDArr}} as const)
// // export const setEntityTaskStatusAC = (entityID: string, listID: string, newStatus: GlobalRequestStatusType) =>
// //     ({type: 'CHANGE-ENTITY-TASK-STATUS', payload: {entityID, newStatus, listID}} as const)
// //AC API
// // export const setAPITasksAC = (tasksArr: IncompleteOneTaskAPIType[], listID: string) =>
// //     ({type: 'SET-API-TASKS-AC', payload: {tasksArr, listID}} as const)
//
//
//
