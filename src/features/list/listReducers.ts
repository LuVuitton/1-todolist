import {FilterType, IncompleteListAPIType, OneToDoListAPIType, ResulAPICode} from "../../Types";
import {runDefaultCatch, setServerError} from "../../utilities/error-utilities";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toDoListsAPI} from "../../DAL/ToDoListsAPI";
import {tasksAPI} from "../../DAL/TasksAPI";
import {createAsyncThunkWithTypes} from "../../utilities";
import {taskActionsGroup} from "../task";
import {appActionsGroup} from "../app";


// т.к. на бэке некоторые ошибки возвращаются с успешным статусом, мы их не можем отловить через кэч
// но в ответе есть поле РезалКод, которое имеет статусы (ошибка все что не есть 0), поэтому проверяем в then через условие
//  скрыл в setErrorTextDependingMessage

//state  в консоль в подредьюсере можно через console.log(current(state))
//типизация санок <то что санка возвращает, то что приходит как пейлоад, то что санка вернет в ошибке rejectWithValue(тут)>

//!!! то что вернет try в санке попадет в екстра редьюсер под именем ИМЯСАНКИ.fulfilled !!!
//таким образом избавляемся от лишнего имени?
//до этого мы делали логику в санке и диспатчили результаты в редьюсер, теперь тоже самое только
//возвращеаем данный из санки и они попадут в экстра редьюсер с таким же именем только.fulfilled
//так мы связываем санку и редьюсер вместе, все запросы после которых выполняется какаято логика делать так

const getListTC = createAsyncThunkWithTypes<void>
('list/getList', async (arg, {dispatch}) => {
    // dispatch(appActionsGroup.setAppStatus({appStatus: 'loading'}))

    const r = await toDoListsAPI.getLists()
    const listsID = r.data.map((e: IncompleteListAPIType) => e.id)

    listsID.forEach(async e => {
        const tasks = await tasksAPI.getTasks(e)
        dispatch(taskActionsGroup.setAPITasksAC({listID: e, tasksArr: tasks.data.items}))
    })//следующая итерация цикла не будет ждать пока выполнится промис,
    // в этом случает нам этом подходит поэтому оставляю так

    dispatch(listActions.setAPIListsAndArrToTasksAC({lists: r.data, newListIDArr: listsID}))

})

const addListAndEmptyTasks = createAsyncThunkWithTypes<{ newList: IncompleteListAPIType }, string>
('list/addLis', async (listTitle, {rejectWithValue}) => {
    const r = await toDoListsAPI.postList(listTitle)
    if (r.resultCode === ResulAPICode.Ok) {
        return ({newList: r.data.item})
    } else {
        // setServerError(dispatch, r)
        return rejectWithValue(r)
    }
})

const removeList = createAsyncThunkWithTypes<{ listID: string }, string>
('list/removeList', async (listID, {dispatch, rejectWithValue}) => {
    // dispatch(appActionsGroup.setAppStatus({appStatus: 'loading'}))

    dispatch(listActions.setListStatusAC({listID, listIsLoading: true}))
    try {
        const r = await toDoListsAPI.deleteList(listID)
        if (r.resultCode === ResulAPICode.Ok) {
            // dispatch(removeListAC({listID}))
            return {listID}
        } else {
            // setServerError(dispatch, r)
            return rejectWithValue(r) 
        }
    } finally {
        dispatch(listActions.setListStatusAC({listID, listIsLoading: false}))
    }
})

const updateList = createAsyncThunkWithTypes<updateListArgType, updateListArgType>('list/updateListTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    // dispatch(appActionsGroup.setAppStatus({appStatus: 'loading'}))
    dispatch(listActions.setListStatusAC({listID: arg.listID, listIsLoading: true}))
    try {
        const r = await toDoListsAPI.updateList(arg.listID, arg.title)
        if (r.resultCode === ResulAPICode.Ok) {
            return arg
        } else {
            // setServerError(dispatch, r)
            return rejectWithValue(r) 
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
        return rejectWithValue(null) 
    } finally {
        dispatch(listActions.setListStatusAC({listID: arg.listID, listIsLoading: false}))
    }
})


const slice = createSlice({
    name: 'list',
    initialState: [] as OneToDoListAPIType[],
    reducers: {
        setAPIListsAndArrToTasksAC(state, action: PayloadAction<{ lists: IncompleteListAPIType[], newListIDArr: string[] }>) {
            return action.payload.lists.map(e => ({...e, filter: 'all', listIsLoading: false}))
        },
        setListStatusAC(state, action: PayloadAction<{ listID: string, listIsLoading: boolean }>) {
            const list = state.find(e => e.id === action.payload.listID)
            if (list)
                list.listIsLoading = action.payload.listIsLoading
        },
        clearAllStateAC() {
            return []
        },
        changeListFilter(state, action: PayloadAction<{ listID: string, filter: FilterType }>) {
            const list = state.find(e => e.id === action.payload.listID)
            if (list)
                list.filter = action.payload.filter
        }
    },
    extraReducers: builder => {
        builder
            .addCase(removeList.fulfilled, (state, action) => {
                const i = state.findIndex(e => e.id === action.payload.listID)
                state.splice(i, 1)
            })
            .addCase(addListAndEmptyTasks.fulfilled, (state, action) => {
                state.unshift({...action.payload.newList, filter: 'all', listIsLoading: false})
            })
            .addCase(updateList.fulfilled, (state, action) => {
                const list = state.find(e => e.id === action.payload.listID)
                if (list)
                    list.title = action.payload.title
            })
    }
})

export const listActions = slice.actions
export const listReducer = slice.reducer
export const listsThunk = {addListAndEmptyTasks, getListTC, removeList, updateListTitle: updateList}



export type updateListArgType = { listID: string, title: string }


//////////////////////////////////////////////

