import {incompleteListAPIType, StatusesForTask} from "../Types";
import {OneTaskType} from "../API-Functional/TasksAPI";

export type AllACTypes = mainACTaskType | mainACListType

export type mainACTaskType =
    | addTaskACType
    | removeTaskACType
    | switchCheckboxACType
    | addEditedTaskACType
    | setAPITasksACType
    | setAPIListsAndArrToTasksACType
    | addListCreateEmptyTasksACType

export type mainACListType =
    | addListCreateEmptyTasksACType
    | removeListACType
    | addEditedListACTitleType
    | setAPIListsAndArrToTasksACType

export type addListCreateEmptyTasksACType = ReturnType<typeof addListCreateEmptyTasksAC>
export type removeListACType = ReturnType<typeof removeListAC>
export type addEditedListACTitleType = ReturnType<typeof addEditedListTitleAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type switchCheckboxACType = ReturnType<typeof switchCheckboxAC>
export type addEditedTaskACType = ReturnType<typeof addEditedTaskAC>
export type setAPIListsAndArrToTasksACType = ReturnType<typeof setAPIListsAndArrToTasksAC>
export type setAPITasksACType = ReturnType<typeof setAPITasksAC>


//AC
export const addListCreateEmptyTasksAC = (inputValue: string, newListID: string) => {
    return {
        type: 'ADD-LIST-AND-CREATE-EMPTY-TASKS-ARR',
        payload: {
            inputValue,
            newListID
        }
    } as const
}
export const removeListAC = (toDoListId: string) => {
    return {
        type: 'REMOVE-LIST',
        payload: {
            toDoListId
        }
    } as const
}
export const addEditedListTitleAC = (value: string, toDoListID: string) => {
    return {
        type: 'ADD-EDITED-LIST-TITLE',
        payload: {
            value,
            toDoListID
        }
    } as const
}
export const addTaskAC = (inputValue: string, toDoListId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            inputValue,        //  inputValue:inputValue
            toDoListId
        }
    } as const
}
export const removeTaskAC = (taskID: string, toDoListId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskID,
            toDoListId
        }
    } as const
}
export const switchCheckboxAC = (taskId: string, checked: StatusesForTask, toDoListId: string) => {
    return {
        type: 'SWITCH-TASKS-CHECKBOX',
        payload: {
            taskId,
            checked,
            toDoListId
        }
    } as const
}
export const addEditedTaskAC = (value: string, toDoListId: string, taskId: string) => {
    return {
        type: 'ADD-EDITED-TASK',
        payload: {
            value,
            toDoListId,
            taskId
        }
    } as const
}
// export const addArrTasksAC = (newListIDArr: string[]) => {
//     return {
//         type: '"SET-API-LISTS-AND-ARR-TO-TASKS"',
//         payload: {
//             newListIDArr: newListIDArr
//         }
//     } as const
// }


//AC API
export const setAPIListsAndArrToTasksAC = (lists: incompleteListAPIType[], newListIDArr: string[]) => {

    return {
        type: 'SET-API-LISTS-AND-ARR-TO-TASKS',
        payload: {
            lists,
            newListIDArr
        }
    } as const
}

export const setAPITasksAC = (tasksArr: OneTaskType[], listID: string) => {
    return {
        type: 'SET-API-TASKS-AC',
        payload: {
            tasksArr,
            listID
        }
    } as const
}

