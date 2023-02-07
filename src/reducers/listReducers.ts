import {v1} from "uuid";
import {mainACListType, ToDoListType} from "../Types";
import {addArrTasksAC} from "../ActionCreators/ActionCreators";


export const listReducer = (state: ToDoListType[], action: mainACListType): ToDoListType[] => {
    switch (action.type) {
        case 'ADD-LIST': {
            const newToDoList:ToDoListType = {toDoListID: v1(), titleList: action.payload.inputValue, filter: 'all'}
            action.payload.dispatchTasks(addArrTasksAC(newToDoList.toDoListID))
            return [newToDoList, ...state]
        }
        case 'REMOVE-LIST': {
            return state.filter((e) => e.toDoListID !== action.payload.toDoListId)
        }
        case 'ADD-EDITED-LIST-TITLE': {
            return state.map(e => e.toDoListID === action.payload.toDoListID ? {
                ...e,
                titleList: action.payload.value
            } : e)
        }
        case 'CHANGE-FILTER-LIST': {
            return state.map(e => e.toDoListID === action.payload.toDoListId ? {...e, filter: action.payload.value} : e)
        }
        default:
            throw new Error('taskReducer not worked')
    }

}

