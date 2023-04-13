import {ErrorResponseDataAPI, IncompleteListAPIType, OneToDoListAPIType, ResulAPICode} from "../../Types";
import {toDoListsAPI} from "../../DAL/ToDoListsAPI";
import {Dispatch} from "redux";
import {GlobalRequestStatusType, setGlobalStatusAC} from "./globalReducer";
import {runDefaultCatch, setErrorTextDependingMessage} from "../../utilities/error-utilities";
import {AxiosError} from "axios";
import {tasksAPI} from "../../DAL/TasksAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAPITasksAC} from "./taskReduser";


// const initState: OneToDoListAPIType[] = []

// субскрайбер в редаксе подписан на то что вернут редьюсеры, и поверхностно сравнивает обьекты старого и нового стейта
const slice = createSlice({
    name: 'list',
    initialState: [] as OneToDoListAPIType[],
    reducers: {
        //переписать мутабельно
        addListCreateEmptyTasksAC(state, action: PayloadAction<{ newList: IncompleteListAPIType }>) {
            state.unshift({...action.payload.newList, filter: 'all', entityStatus:'idle'})
        },
        removeListAC(state, action: PayloadAction<{ listID: string }>) {
            const i = state.findIndex(e => e.id === action.payload.listID)
            state.splice(i, 1)
        },
        addEditedListTitleAC(state, action: PayloadAction<{ title: string, listID: string }>) {
            const list = state.find(e => e.id === action.payload.listID)
            if (list)
                list.title = action.payload.title
        },
        setEntityListStatusAC(state, action: PayloadAction<{ listID: string, entityStatus: GlobalRequestStatusType }>) {
            const list = state.find(e => e.id === action.payload.listID)
            if (list)
                list.entityStatus = action.payload.entityStatus
        },
        setAPIListsAndArrToTasksAC(state, action: PayloadAction<{ lists: IncompleteListAPIType[], newListIDArr: string[] }>) {
            return action.payload.lists.map(e => ({...e, filter: 'all', entityStatus:'idle'}))
        },
        clearAllStateAC() {
            return []
        }
    }
})


export const listReducer = slice.reducer
export const {
    removeListAC, addEditedListTitleAC,
    setEntityListStatusAC, setAPIListsAndArrToTasksAC,
    clearAllStateAC, addListCreateEmptyTasksAC
} = slice.actions


// т.к. на бэке некоторые ошибки возвращаются с успешным статусом, мы их не можем отловить через кэч
// но в ответе есть поле РезалКод, которое имеет статусы (ошибка все что не есть 0), поэтому проверяем в then через условие
//  скрыл в setErrorTextDependingMessage

// getListTC написал одинаковые типы в двух редьюсерах что бы раскинуть айди от только что полученых туду листов в таски
export const getListTC = () => (dispatch: Dispatch) => {
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    toDoListsAPI.getLists()
        .then(r => {
            const listsID = r.data.map((e: IncompleteListAPIType) => e.id)
            dispatch(setAPIListsAndArrToTasksAC({lists: r.data, newListIDArr: listsID}))
            return listsID
        })
        .then((r: string[]) => {
            r.forEach((e) =>
                tasksAPI.getTasks(e)
                    .then(r => {
                        dispatch(setAPITasksAC({listID: e, tasksArr: r.data.items}))
                        dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
                    }))
        })
        //AxiosError<?> сюда вкладываем то что по документации должен вернуть бэк в респонсе ошибки
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
        })
}

export const addAPIListTC = (listTitle: string) => (dispatch: Dispatch) => {
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    toDoListsAPI.postList(listTitle)
        .then(r => {
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(addListCreateEmptyTasksAC({newList: r.data.item}))
                dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
            } else {
                setErrorTextDependingMessage(dispatch, r)
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
        })
}

export const deleteAPIListTC = (listID: string) => (dispatch: Dispatch) => {
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    dispatch(setEntityListStatusAC({listID, entityStatus: 'loading'}))

    toDoListsAPI.deleteList(listID)
        .then((r) => {
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(removeListAC({listID}))
                dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
            } else {
                setErrorTextDependingMessage(dispatch, r)
                dispatch(setEntityListStatusAC({listID, entityStatus: 'failed'}))
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
            dispatch(setEntityListStatusAC({listID, entityStatus: 'failed'}))
        })
}

export const addEditedListTitleTC = (listID: string, newValue: string) => (dispatch: Dispatch) => {
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    dispatch(setEntityListStatusAC({listID, entityStatus: 'loading'}))
    toDoListsAPI.updateList(listID, newValue)
        //дописать спан в компоненте,сейчас там лок стейт, поэтому меняет состояние вне зависимости от результата
        .then(r => {
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(addEditedListTitleAC({listID, title: newValue}))
                dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
                dispatch(setEntityListStatusAC({listID, entityStatus: 'succeeded'}))
            } else {
                setErrorTextDependingMessage(dispatch, r)
                dispatch(setEntityListStatusAC({listID, entityStatus: 'failed'}))
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
            dispatch(setEntityListStatusAC({listID, entityStatus: 'failed'}))
        })
}


// export const listReducer = (state: OneToDoListAPIType[] = initState, action: GeneralListACType): OneToDoListAPIType[] => {
//
//     switch (action.type) {
//
//         // case 'REMOVE-LIST':
//         //     return state.filter((e) => e.id !== action.payload.listID)
//         // case 'ADD-EDITED-LIST-TITLE':
//         //     return state.map(e => e.id === action.payload.listID ? {...e, title: action.payload.value,} : e)
//         // case "SET-API-LISTS-AND-ARR-TO-TASKS":
//         //     return action.payload.lists.map((e:any) => ({...e, filter: 'all', entityStatus: "idle"}))
//         // case 'CHANGE-ENTITY-LIST-STATUS':
//         //     return state.map(e => e.id === action.payload.entityID ? {...e, entityStatus: action.payload.newStatus} : e)
//         // case "CLEAR-ALL-STATE":
//         //     return []
//         // case 'ADD-LIST-AND-CREATE-EMPTY-TASKS-ARR':
//         //     //[{...созданый на сервере лист, фильтр которого не хватает}]
//         //     return [{...action.payload.newList, filter: 'all', entityStatus: "idle"}, ...state]
//
//         default:
//             return state
//     }
//
// }

// export const idToDoList1 = v1(); //значение свойства toDoListID с айди в тудулисте и ключ листа в массиве тасок
// export const idToDoList2 = v1(); //это не одна и таже строка, она просто совпадает по знаечению