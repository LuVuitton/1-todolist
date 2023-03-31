import {v1} from "uuid";
import {addArrTasksAC, mainACListType, setAPIListsAC, setAPITasksAC} from "../../actionCreators/ActionCreators";
import {incompleteListAPIType, OneToDoListAPIType} from "../../Types";
import {toDoListsAPI} from "../../API-Functional/ToDoListsAPI";
import {Dispatch} from "redux";
import {tasksAPI} from "../../API-Functional/TasksAPI";

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
                order:1,
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
        case "SET-API-LISTS": {
            return action.payload.lists.map((e )=>({...e, filter:'all'}))
        }
        default:
            return state
    }
}


// export type getListTCType = ReturnType<typeof getListTC>


export const getListTC = ()=> {
    return (dispatch:Dispatch) => {

        let listsID: string[] = []
       toDoListsAPI.getLists()
            .then((r: incompleteListAPIType[]) => {
                listsID = r.map((e: incompleteListAPIType) => e.id)
                dispatch(setAPIListsAC(r))
                dispatch(addArrTasksAC(listsID))
            })
            .then(() => {
                tasksAPI.getTasks(listsID[0]).then(r => dispatch(setAPITasksAC(r, listsID[0])))
            })
    }
}