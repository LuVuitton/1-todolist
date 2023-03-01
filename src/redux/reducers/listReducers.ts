import {v1} from "uuid";
import {mainACListType, ToDoListType} from "../../Types";

export const idToDoList1 = v1(); //значение свойства toDoListID с айди в тудулисте и ключ листа в массиве тасок
export const idToDoList2 = v1(); //это не одна и таже строка, она просто совпадает по знаечению (НО ЭТО НЕ ТОЧНО)

const initState: ToDoListType[] = [
    {toDoListID: idToDoList1, titleList: 'what to learn', filter: 'all'}, //тут без [] потому как переменная стоит не в ключе а в значении
    {toDoListID: idToDoList2, titleList: 'numbers', filter: 'all'}
]

export const listReducer = (state: ToDoListType[] = initState, action: mainACListType): ToDoListType[] => {
    switch (action.type) {
        case 'ADD-LIST': {
            const newToDoList: ToDoListType = {toDoListID: action.payload.newListID, titleList: action.payload.inputValue, filter: 'all'}
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
            return state
    }

}

