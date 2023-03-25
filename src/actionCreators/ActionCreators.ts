
export const addListAC = (inputValue: string, newListID:string) => {
    return {
        type: 'ADD-LIST',
        payload: {
            inputValue,     //inputValue:inputValue
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
export const addArrTasksAC = (newListID: string) => {
    return {
        type: 'ADD-ARR-TASKS',
        payload: {
            newListID
        }
    } as const
}

