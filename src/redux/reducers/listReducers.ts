import {
    mainACListType,
    addEditedListTitleAC,
    addListCreateEmptyTasksAC,
    removeListAC,
    setAPIListsAndArrToTasksAC,
} from "../actionCreators/ActionCreators";
import {IncompleteListAPIType, OneToDoListAPIType} from "../../Types";
import {toDoListsAPI} from "../../DAL/ToDoListsAPI";
import {Dispatch} from "redux";


// export const idToDoList1 = v1(); //значение свойства toDoListID с айди в тудулисте и ключ листа в массиве тасок
// export const idToDoList2 = v1(); //это не одна и таже строка, она просто совпадает по знаечению (НО ЭТО НЕ ТОЧНО)

const initState: OneToDoListAPIType[] = [
    // {id: idToDoList1, title: 'what to learn', filter: 'all', addedDate: '', order: 1}, //тут без [] потому как переменная стоит не в ключе а в значении
    // {id: idToDoList2, title: 'numbers', filter: 'all', addedDate: '', order: 1}
]


// субскрайбер в редаксе подписан на то что вернут редьюсеры, и поверхностно сравнивает обьекты старого и нового стейта
export const listReducer = (state: OneToDoListAPIType[] = initState, action: mainACListType): OneToDoListAPIType[] => {

    switch (action.type) {

        case 'ADD-LIST-AND-CREATE-EMPTY-TASKS-ARR':
            //[{...созданый на сервере лист, фильтр которого не хватает}]
            return [{...action.payload.newList, filter: 'all'}, ...state]
        case 'REMOVE-LIST':
            return state.filter((e) => e.id !== action.payload.listID)
        case 'ADD-EDITED-LIST-TITLE':
            return state.map(e => e.id === action.payload.listID ? {...e, title: action.payload.value,} : e)
        case "SET-API-LISTS-AND-ARR-TO-TASKS":
            return action.payload.lists.map((e) => ({...e, filter: 'all'}))
        default:
            return state
    }

}

// getListTC написал одинаковые типы в двух редьюсерах что бы раскинуть айди от только что полученых туду листов в таски
export const getListTC = () => (dispatch: Dispatch) => {
    toDoListsAPI.getLists()
        .then((r: IncompleteListAPIType[]) => {
            const listsID = r.map((e: IncompleteListAPIType) => e.id)
            dispatch(setAPIListsAndArrToTasksAC(r, listsID))
        })
}

export const addAPIListTC = (listTitle: string) => (dispatch: Dispatch) => {
    toDoListsAPI.postList(listTitle)
        .then(r => dispatch(addListCreateEmptyTasksAC(listTitle, r.item)))
}

export const deleteAPIListTC = (listID: string) => (dispatch: Dispatch) => {
    toDoListsAPI.deleteList(listID)
        .then(() => dispatch(removeListAC(listID)))
}

export const addEditedListTitleTC = (listID: string, newValue: string) => (dispatch: Dispatch) => {
    toDoListsAPI.updateList(listID, newValue)
        .then(() => dispatch(addEditedListTitleAC(newValue, listID)))
}