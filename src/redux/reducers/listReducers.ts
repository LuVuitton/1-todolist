import {v1} from "uuid";
import {mainACListType, OneToDoListAPIType} from "../../Types";

export const idToDoList1 = v1(); //значение свойства toDoListID с айди в тудулисте и ключ листа в массиве тасок
export const idToDoList2 = v1(); //это не одна и таже строка, она просто совпадает по знаечению (НО ЭТО НЕ ТОЧНО)

const initState: OneToDoListAPIType[] = [
    {id: idToDoList1, title: 'what to learn', filter: 'all', addedDate:'', order:1}, //тут без [] потому как переменная стоит не в ключе а в значении
    {id: idToDoList2, title: 'numbers', filter: 'all', addedDate:'', order:1}
]

export const listReducer = (state: OneToDoListAPIType[] = initState, action: mainACListType): OneToDoListAPIType[] => {
    switch (action.type) {
        case 'ADD-LIST': {
            const newToDoList: OneToDoListAPIType = {
                id: action.payload.newListID,
                title: action.payload.inputValue,
                filter: 'all',
                addedDate: '',
                order:1
            }
            return [newToDoList, ...state]
        }

        case 'REMOVE-LIST': {
            return state.filter((e) => e.id !== action.payload.toDoListId)
        }
        case 'ADD-EDITED-LIST-TITLE': {
            return state.map(e => e.id === action.payload.toDoListID ? {
                ...e,
                title: action.payload.value,
            } : e)

        }

        // case 'CHANGE-FILTER-LIST': {
        //     return state.map(e => e.toDoListID === action.payload.toDoListId ? {...e, filter: action.payload.value} : e)
        // }
        default:
            return state
    }
}

