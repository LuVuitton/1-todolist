import {v1} from "uuid";
import {addArrTasksAC} from "./taskReduser";
import {mainACListType, ToDoListType} from "../Types";



export const listReducer = (state: ToDoListType[], action: mainACListType) => {
    switch (action.type) {
        case 'ADD-LIST': {
            const newToDoList = {toDoListID: v1(), titleList: action.payload.inputValue, filter: 'all'}
            action.payload.dispatchTasks(addArrTasksAC(newToDoList.toDoListID))
            return [newToDoList, ...state]
        }
        case 'REMOVE-LIST': {
            return state.filter((e: any) => e.toDoListID !== action.payload.toDoListId)
        }
        case 'ADD-EDITED-LIST-TITLE': {
            state.map((e: any) => {
                if (e.toDoListID === action.payload.toDoListID) {
                    e.titleList = action.payload.value
                }
            })
            return [...state]

        }
        default:
            throw new Error('taskReducer not worked')
    }

}

export const addListAC = (inputValue: string, dispatchTasks: any) => {
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