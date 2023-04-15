import {IncompleteListAPIType, OneToDoListAPIType, ResulAPICode} from "../../Types";
import {runDefaultCatch, setErrorTextDependingMessage} from "../../utilities/error-utilities";
import {GlobalRequestStatusType, setGlobalStatusAC} from "./globalReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toDoListsAPI} from "../../DAL/ToDoListsAPI";
import {tasksAPI} from "../../DAL/TasksAPI";
import {createAsyncThunkWithTypes} from "../../utilities/createAsyncThunkWithTypes";
import {taskActions} from "./taskReduser";


//state  в консоль в подредьюсере можно через console.log(current(state))


//типизация санок <то что санка возвращает, то что приходит как пейлоад, то что санка вернет в ошибке rejectWithValue(тут)>


//то что вернет try в санке попадет в екстра редьюсер под именем ИМЯСАНКИ.fulfilled
//таким образом избавляемся от лишнего имени?
//до этого мы делали логику в санке и диспатчили результаты в редьюсер, теперь тоже самое только
//возвращеаем данный из санки и они попадут в экстра редьюсер с таким же именем только.fulfilled
//так мы связываем санку и редьюсер вместе, все запросы после которых выполняется какаято логика делать так
const getListTC = createAsyncThunk('list/getList', async (arg, thunkAPI) => {
    const {dispatch} = thunkAPI
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    try {
        const r = await toDoListsAPI.getLists()
        const listsID = r.data.map((e: IncompleteListAPIType) => e.id)

        listsID.forEach(async e => {
            const tasks = await tasksAPI.getTasks(e)
            dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
            dispatch(taskActions.setAPITasksAC({listID: e, tasksArr: tasks.data.items}))
        })//следующая итерация цикла не будет ждать пока вернется промис,
        // в этом случает нам этом подходит поэтому оставляю так

        dispatch(listActions.setAPIListsAndArrToTasksAC({lists: r.data, newListIDArr: listsID}))

    } catch (err) {
        runDefaultCatch(dispatch, err)
    }
})

const addListAndEmptyTasks = createAsyncThunkWithTypes<{ newList: IncompleteListAPIType }, string>('list/addLis', async (listTitle, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    try {
        const r = await toDoListsAPI.postList(listTitle)
        if (r.resultCode === ResulAPICode.Ok) {
            dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
            // dispatch(addListCreateEmptyTasksAC({newList: r.data.item}))
            return ({newList: r.data.item})
        } else {
            setErrorTextDependingMessage(dispatch, r)
            return rejectWithValue(null)
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
        return rejectWithValue(null)

    }
})
const deleteAPIListTC = createAsyncThunkWithTypes<{ listID: string }, string>('list/deleteAPIList', async (listID, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    dispatch(listActions.setListStatusAC({listID, entityStatus: 'loading'}))
    try {
        const r = await toDoListsAPI.deleteList(listID)
        if (r.resultCode === ResulAPICode.Ok) {
            dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
            // dispatch(removeListAC({listID}))
            return {listID}
        } else {
            dispatch(listActions.setListStatusAC({listID, entityStatus: 'failed'}))
            setErrorTextDependingMessage(dispatch, r)
            return rejectWithValue(null) //пока оставлю как заглушку что бы не проверять на андефайнд дальше
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
        dispatch(listActions.setListStatusAC({listID, entityStatus: 'failed'}))
        return rejectWithValue(null) //пока оставлю как заглушку что бы не проверять на андефайнд дальше
    }
})
const updateListTitle = createAsyncThunkWithTypes<{ listID: string, title: string }, { listID: string, title: string }>('list/updateListTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    dispatch(listActions.setListStatusAC({listID: arg.listID, entityStatus: 'loading'}))
    try {
        const r = await toDoListsAPI.updateList(arg.listID, arg.title)
        if (r.resultCode === ResulAPICode.Ok) {
            dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
            dispatch(listActions.setListStatusAC({listID: arg.listID, entityStatus: 'succeeded'}))
            return {listID: arg.listID, title: arg.title}
        } else {
            setErrorTextDependingMessage(dispatch, r)
            dispatch(listActions.setListStatusAC({listID: arg.listID, entityStatus: 'failed'}))
            return rejectWithValue(null) //пока оставлю как заглушку что бы не проверять на андефайнд дальше
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
        dispatch(listActions.setListStatusAC({listID: arg.listID, entityStatus: 'failed'}))
        return rejectWithValue(null) //пока оставлю как заглушку что бы не проверять на андефайнд дальше
    }
})


export const listsThunk = {addListAndEmptyTasks, getListTC, deleteAPIListTC, updateListTitle}


/////////////////////////////////////////////////////////////////////////

// субскрайбер в редаксе подписан на то что вернут редьюсеры, и сравнивает обьекты старого и нового стейта
const slice = createSlice({
    name: 'list',
    initialState: [] as OneToDoListAPIType[],
    reducers: {
        // addListCreateEmptyTasksAC(state, action: PayloadAction<{ newList: IncompleteListAPIType }>) {
        //     state.unshift({...action.payload.newList, filter: 'all', entityStatus: 'idle'})
        // },
        // removeListAC(state, action: PayloadAction<{ listID: string }>) {
        //     const i = state.findIndex(e => e.id === action.payload.listID)
        //     state.splice(i, 1)
        // },
        // addEditedListTitleAC(state, action: PayloadAction<{ title: string, listID: string }>) {
        //     const list = state.find(e => e.id === action.payload.listID)
        //     if (list)
        //         list.title = action.payload.title
        // },
        setAPIListsAndArrToTasksAC(state, action: PayloadAction<{ lists: IncompleteListAPIType[], newListIDArr: string[] }>) {
            return action.payload.lists.map(e => ({...e, filter: 'all', entityStatus: 'idle'}))
        },
        setListStatusAC(state, action: PayloadAction<{ listID: string, entityStatus: GlobalRequestStatusType }>) {
            const list = state.find(e => e.id === action.payload.listID)
            if (list)
                list.entityStatus = action.payload.entityStatus
        },
        clearAllStateAC() {
            return []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(deleteAPIListTC.fulfilled, (state, action) => {
                const i = state.findIndex(e => e.id === action.payload.listID)
                state.splice(i, 1)
            })
            .addCase(addListAndEmptyTasks.fulfilled, (state, action) => {
                state.unshift({...action.payload.newList, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(updateListTitle.fulfilled, (state, action) => {
                const list = state.find(e => e.id === action.payload.listID)
                if (list)
                    list.title = action.payload.title
            })
    }
})


export const listReducer = slice.reducer
export const listActions = slice.actions


//////////////////////////////////////////////


// т.к. на бэке некоторые ошибки возвращаются с успешным статусом, мы их не можем отловить через кэч
// но в ответе есть поле РезалКод, которое имеет статусы (ошибка все что не есть 0), поэтому проверяем в then через условие
//  скрыл в setErrorTextDependingMessage

// getListTC написал одинаковые типы в двух редьюсерах что бы раскинуть айди от только что полученых туду листов в таски
// export const getListTC = () => (dispatch: Dispatch) => {
//     dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
//     toDoListsAPI.getLists()
//         .then(r => {
//             const listsID = r.data.map((e: IncompleteListAPIType) => e.id)
//             dispatch(setAPIListsAndArrToTasksAC({lists: r.data, newListIDArr: listsID}))
//             return listsID
//         })
//         .then((r: string[]) => {
//             r.forEach((e) =>
//                 tasksAPI.getTasks(e)
//                     .then(r => {
//                         dispatch(setAPITasksAC({listID: e, tasksArr: r.data.items}))
//                         dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
//                     }))
//         })
//         //AxiosError<?> сюда вкладываем то что по документации должен вернуть бэк в респонсе ошибки
//         .catch((err: AxiosError<ErrorResponseDataAPI>) => {
//             runDefaultCatch(dispatch, err)
//         })
// }
// export const addAPIListTC = (listTitle: string) => (dispatch: Dispatch) => {
//     dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
//     toDoListsAPI.postList(listTitle)
//         .then(r => {
//             if (r.resultCode === ResulAPICode.Ok) {
//                 dispatch(addListCreateEmptyTasksAC({newList: r.data.item}))
//                 dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
//             } else {
//                 setErrorTextDependingMessage(dispatch, r)
//             }
//         })
//         .catch((err: AxiosError<ErrorResponseDataAPI>) => {
//             runDefaultCatch(dispatch, err)
//         })
// }
// export const deleteAPIListTC = (listID: string) => (dispatch: Dispatch) => {
//     dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
//     dispatch(setEntityListStatusAC({listID, entityStatus: 'loading'}))
//
//     toDoListsAPI.deleteList(listID)
//         .then((r) => {
//             if (r.resultCode === ResulAPICode.Ok) {
//                 dispatch(removeListAC({listID}))
//                 dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
//             } else {
//                 setErrorTextDependingMessage(dispatch, r)
//                 dispatch(setEntityListStatusAC({listID, entityStatus: 'failed'}))
//             }
//         })
//         .catch((err: AxiosError<ErrorResponseDataAPI>) => {
//             runDefaultCatch(dispatch, err)
//             dispatch(setEntityListStatusAC({listID, entityStatus: 'failed'}))
//         })
// }
// export const updateListTitle = (listID: string, newValue: string) => (dispatch: Dispatch) => {
//     dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
//     dispatch(setEntityListStatusAC({listID, entityStatus: 'loading'}))
//     toDoListsAPI.updateList(listID, newValue)
//         //дописать спан в компоненте,сейчас там лок стейт, поэтому меняет состояние вне зависимости от результата
//         .then(r => {
//             if (r.resultCode === ResulAPICode.Ok) {
//                 dispatch(addEditedListTitleAC({listID, title: newValue}))
//                 dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
//                 dispatch(setEntityListStatusAC({listID, entityStatus: 'succeeded'}))
//             } else {
//                 setErrorTextDependingMessage(dispatch, r)
//                 dispatch(setEntityListStatusAC({listID, entityStatus: 'failed'}))
//             }
//         })
//         .catch((err: AxiosError<ErrorResponseDataAPI>) => {
//             runDefaultCatch(dispatch, err)
//             dispatch(setEntityListStatusAC({listID, entityStatus: 'failed'}))
//         })
// }

// const initState: OneToDoListAPIType[] = []

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