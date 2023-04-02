import {v1} from "uuid";
import {
    addListCreateEmptyTasksAC,
    mainACListType, removeListAC,
    setAPIListsAndArrToTasksAC,
} from "../../actionCreators/ActionCreators";
import {incompleteListAPIType, OneToDoListAPIType} from "../../Types";
import {toDoListsAPI} from "../../API-Functional/ToDoListsAPI";
import {Dispatch} from "redux";


export const idToDoList1 = v1(); //значение свойства toDoListID с айди в тудулисте и ключ листа в массиве тасок
export const idToDoList2 = v1(); //это не одна и таже строка, она просто совпадает по знаечению (НО ЭТО НЕ ТОЧНО)

const initState: OneToDoListAPIType[] = [
    // {id: idToDoList1, title: 'what to learn', filter: 'all', addedDate: '', order: 1}, //тут без [] потому как переменная стоит не в ключе а в значении
    // {id: idToDoList2, title: 'numbers', filter: 'all', addedDate: '', order: 1}
]


// субскрайбер в редаксе подписан на то что вернут редьюсеры, и поверхностно сравнивает обьекты старого и нового стейта
export const listReducer = (state: OneToDoListAPIType[] = initState, action: mainACListType): OneToDoListAPIType[] => {

    switch (action.type) {

        case 'ADD-LIST-AND-CREATE-EMPTY-TASKS-ARR': {
            const newToDoList: OneToDoListAPIType = {
                id: action.payload.newListID,
                title: action.payload.inputValue,
                filter: 'all',
                addedDate: '',
                order: 1,
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
        case "SET-API-LISTS-AND-ARR-TO-TASKS": {
            return action.payload.lists.map((e) => ({...e, filter: 'all'}))
        }
        default:
            return state
    }
}


export const getListTC = () => (dispatch: Dispatch) => {

    let listsID: string[] = []

    toDoListsAPI.getLists()
        .then((r: incompleteListAPIType[]) => {
            listsID = r.map((e: incompleteListAPIType) => e.id)
            // написал одинаковые типы в двух редьюсерах что бы раскинуть айди от только что полученых туду листов в таски
            dispatch(setAPIListsAndArrToTasksAC(r, listsID))
        })
}

export const addAPIListTC = (listTitle:string) => (dispatch:Dispatch)=> {
    toDoListsAPI.postList(listTitle)
        .then(r=>dispatch(addListCreateEmptyTasksAC(listTitle, r.data.item.id)) )
}

export const deleteAPIListTC = (listID:string)=> (dispatch:Dispatch)=> {
    toDoListsAPI.deleteList(listID).then(()=>dispatch(removeListAC(listID)))
}