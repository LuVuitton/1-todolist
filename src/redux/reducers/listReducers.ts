import {
    GeneralListACType,
    addEditedListTitleAC,
    addListCreateEmptyTasksAC,
    removeListAC,
    setAPIListsAndArrToTasksAC, setEntityListStatusAC,
} from "../actionCreators/ActionCreators";
import {ErrorResponseDataAPI, IncompleteListAPIType, OneToDoListAPIType, ResulAPICode} from "../../Types";
import {toDoListsAPI} from "../../DAL/ToDoListsAPI";
import {Dispatch} from "redux";
import {setGlobalStatusAC} from "./globalReducer";
import {runDefaultCatch, setErrorTextDependingMessage} from "../../utilities/error-utilities";
import {AxiosError} from "axios";


// export const idToDoList1 = v1(); //значение свойства toDoListID с айди в тудулисте и ключ листа в массиве тасок
// export const idToDoList2 = v1(); //это не одна и таже строка, она просто совпадает по знаечению

const initState: OneToDoListAPIType[] = [
    // {id: idToDoList1, title: 'what to learn', filter: 'all', addedDate: '', order: 1}, //тут без [] потому как переменная стоит не в ключе а в значении
    // {id: idToDoList2, title: 'numbers', filter: 'all', addedDate: '', order: 1}
]


// субскрайбер в редаксе подписан на то что вернут редьюсеры, и поверхностно сравнивает обьекты старого и нового стейта
export const listReducer = (state: OneToDoListAPIType[] = initState, action: GeneralListACType): OneToDoListAPIType[] => {

    switch (action.type) {

        case 'ADD-LIST-AND-CREATE-EMPTY-TASKS-ARR':
            //[{...созданый на сервере лист, фильтр которого не хватает}]
            return [{...action.payload.newList, filter: 'all', entityStatus: "idle"}, ...state]
        case 'REMOVE-LIST':
            return state.filter((e) => e.id !== action.payload.listID)
        case 'ADD-EDITED-LIST-TITLE':
            return state.map(e => e.id === action.payload.listID ? {...e, title: action.payload.value,} : e)
        case "SET-API-LISTS-AND-ARR-TO-TASKS":
            return action.payload.lists.map((e) => ({...e, filter: 'all', entityStatus: "idle"}))
        case 'CHANGE-ENTITY-LIST-STATUS':
            return state.map(e => e.id === action.payload.entityID ? {...e, entityStatus: action.payload.newStatus} : e)

        default:
            return state
    }

}


// т.к. на бэке некоторые ошибки возвращаются с успешным статусом, мы их не можем отловить через кэч
// но в ответе есть поле РезалКод, которое имеет статусы (ошибка все что не есть 0), поэтому проверяем в then через условие
//  скрыл в setErrorTextDependingMessage

// getListTC написал одинаковые типы в двух редьюсерах что бы раскинуть айди от только что полученых туду листов в таски
export const getListTC = () => (dispatch: Dispatch<GeneralListACType>) => {
    dispatch(setGlobalStatusAC("loading"))
    toDoListsAPI.getLists()
        .then((r) => {
            const listsID = r.data.map((e: IncompleteListAPIType) => e.id)
            dispatch(setAPIListsAndArrToTasksAC(r.data, listsID))
            dispatch(setGlobalStatusAC("succeeded"))
        })
        //AxiosError<?> сюда вкладываем то что по документации должен вернуть бэк в респонсе ошибки
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
        })
}

export const addAPIListTC = (listTitle: string) => (dispatch: Dispatch<GeneralListACType>) => {
    dispatch(setGlobalStatusAC("loading"))
    toDoListsAPI.postList(listTitle)
        .then(r => {
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(addListCreateEmptyTasksAC(r.data.item))
                dispatch(setGlobalStatusAC("succeeded"))
            } else {
                setErrorTextDependingMessage(dispatch, r)
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
        })
}

export const deleteAPIListTC = (listID: string) => (dispatch: Dispatch<GeneralListACType>) => {
    dispatch(setGlobalStatusAC('loading'))
    dispatch(setEntityListStatusAC(listID, 'loading'))

    toDoListsAPI.deleteList(listID)
        .then((r) => {
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(removeListAC(listID))
                dispatch(setGlobalStatusAC("succeeded"))
            } else {
                setErrorTextDependingMessage(dispatch, r)
                dispatch(setEntityListStatusAC(listID, 'failed'))
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
            dispatch(setEntityListStatusAC(listID, 'failed'))
        })
}

export const addEditedListTitleTC = (listID: string, newValue: string) => (dispatch: Dispatch<GeneralListACType>) => {
    dispatch(setGlobalStatusAC("loading"))
    dispatch(setEntityListStatusAC(listID, 'loading'))
    toDoListsAPI.updateList(listID, newValue)
        //дописать спан в компоненте,сейчас там лок стейт, поэтому меняет состояние вне зависимости от результата
        .then(r => {
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(addEditedListTitleAC(newValue, listID))
                dispatch(setGlobalStatusAC("succeeded"))
                dispatch(setEntityListStatusAC(listID, 'succeeded'))
            } else {
                setErrorTextDependingMessage(dispatch, r)
                dispatch(setEntityListStatusAC(listID, 'failed'))
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
            dispatch(setEntityListStatusAC(listID, 'failed'))
        })
}