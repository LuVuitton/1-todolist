import {addArrTasksACType, FilterType} from "../Types";

export const addListAC = (inputValue: string, dispatchTasks: (addArrTasksAC: addArrTasksACType) => void) => {
    return {
        type: 'ADD-LIST',
        payload: {
            inputValue,     //inputValue:inputValue
            dispatchTasks
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

export const changeFilterListAC = (value: FilterType, toDoListId: string) => {
    return {
        type: 'CHANGE-FILTER-LIST',
        payload: {
            value,
            toDoListId
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
export const switchCheckboxAC = (taskId: string, checked: boolean, toDoListId: string) => {
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
export const addArrTasksAC = (newListId: string) => {
    return {
        type: 'ADD-ARR-TASKS',
        payload: {
            newListId
        }
    } as const
}

