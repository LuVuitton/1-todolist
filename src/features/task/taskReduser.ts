import {AllTasksType, CheckStatus, IncompleteOneTaskAPIType, ResulAPICode,} from "../../Types";
import {runDefaultCatch, setServerError} from "../../utilities/error-utilities";
import {createAsyncThunkWithTypes, thunkTryCatch} from "../../utilities";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {listActionsGroup} from "../list";
import {appActionsGroup} from "../app";
import {tasksAPI} from "../../DAL/TasksAPI";






const removeTask = createAsyncThunkWithTypes<removeTaskArgType, removeTaskArgType>('tasks/removeTask', async (arg, thunkAPI) => {
    thunkAPI.dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, taskIsLoading: true}))
    return thunkTryCatch(thunkAPI, async () => {
        const r = await tasksAPI.deleteTask(arg.listID, arg.taskID)
        if (r.resultCode === ResulAPICode.Ok) {
            return {listID: arg.listID, taskID: arg.taskID}
        } else {
            // setServerError(thunkAPI.dispatch, r)
            return thunkAPI.rejectWithValue(r) 
        }
    }).finally(() => {
        thunkAPI.dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, taskIsLoading: false}))
    })
})

const addTask = createAsyncThunkWithTypes<{ newTask: IncompleteOneTaskAPIType }, { listID: string, title: string }>
('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActionsGroup.setAppStatus({appStatus: 'loading'}))
    dispatch(listActionsGroup.setListStatusAC({listID: arg.listID, listIsLoading: true}))

    try {
        const r = await tasksAPI.postTask(arg.listID, arg.title)
        if (r.resultCode === ResulAPICode.Ok) { //0 только приуспешном выполнении, ошибки всё кроме 0
            return {newTask: r.data.item}
        } else {
            // setServerError(dispatch, r,false)
            return rejectWithValue(r)
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
        return rejectWithValue(null)
    } finally {
        dispatch(listActionsGroup.setListStatusAC({listID: arg.listID, listIsLoading: false}))
    }
})

const updateTask = createAsyncThunkWithTypes<updateTaskArgType, updateTaskArgType>('task/updateTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    dispatch(appActionsGroup.setAppStatus({appStatus: 'loading'}))
    dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, taskIsLoading: true}))
    try {
        const task = getState().tasks[arg.listID].find(e => e.id === arg.taskID)
        if (!task) {
            return rejectWithValue(null)
        }
        const updatedTask = {...task, title: arg.title}
        const r = await tasksAPI.updateTask(arg.listID, arg.taskID, updatedTask)
        if (r.resultCode === ResulAPICode.Ok && updatedTask) {
            dispatch(appActionsGroup.setAppStatus({appStatus: 'succeeded'}))
            return arg
        } else {
            // setServerError(dispatch, r)
            return rejectWithValue(r)
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
        return rejectWithValue(null)
    } finally {
        dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, taskIsLoading: false}))
    }

})
const switchCheck = createAsyncThunkWithTypes<switchCheckArgType, switchCheckArgType>('tasks/switchTaskCheck', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    dispatch(appActionsGroup.setAppStatus({appStatus: 'loading'}))
    dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, taskIsLoading: true}))
    try {
        const task = getState().tasks[arg.listID].find(e => e.id === arg.taskID)
        if (!task) {
            return rejectWithValue(null)
        }
        const updatedTask = {...task, status: arg.check}
        const r = await tasksAPI.updateTask(arg.listID, arg.taskID, updatedTask)
        if (r.resultCode === ResulAPICode.Ok) {
            dispatch(appActionsGroup.setAppStatus({appStatus: 'succeeded'}))
            return arg
        } else {
            setServerError(dispatch, r)
            return rejectWithValue(null)
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
        return rejectWithValue(null)
    } finally {
        dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, taskIsLoading: false}))
    }
})


const slice = createSlice({
    name: 'tasks',
    initialState: {} as AllTasksType,
    reducers: {
        setAPITasksAC(state, action: PayloadAction<{ tasksArr: IncompleteOneTaskAPIType[], listID: string }>) {
            const mappedTasks = action.payload.tasksArr.map(e => ({
                ...e,
                taskIsLoading: false
            }))
            state[action.payload.listID] = [...mappedTasks]
        },
        setTaskStatusAC(state, action: PayloadAction<{ taskID: string, listID: string, taskIsLoading: boolean }>) {
            const task = state[action.payload.listID].find(e => e.id === action.payload.taskID)
            if (task)
                task.taskIsLoading = action.payload.taskIsLoading
        },
    },
    extraReducers: (builder) => { // Дополнительные редьюсеры
        builder
            .addCase(listActionsGroup.setAPIListsAndArrToTasksAC, (state, action) => {
                let newObj: AllTasksType = {}
                action.payload.newListIDArr.forEach(e => newObj[e] = [])
                return {...state, ...newObj}
            })
            .addCase(listActionsGroup.addListAndEmptyTasks.fulfilled, (state, action) => {
                state[action.payload.newList.id] = []
            })
            .addCase(listActionsGroup.removeList.fulfilled, (state, action) => {
                delete state[action.payload.listID] //удаляем такски удаленного массива
            })
            .addCase(listActionsGroup.clearAllStateAC, () => {
                return {}
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const i = state[action.payload.listID].findIndex(e => e.id === action.payload.taskID)
                state[action.payload.listID].splice(i, 1)
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.newTask.todoListId].unshift({...action.payload.newTask, taskIsLoading: false})
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const task = state[action.payload.listID].find(e => e.id === action.payload.taskID)
                if (task)
                    task.title = action.payload.title
            })
            .addCase(switchCheck.fulfilled, (state, action) => {
                const task = state[action.payload.listID].find(e => e.id === action.payload.taskID)
                if (task)
                    task.status = action.payload.check
            })
    },
})


export const taskReducer = slice.reducer
export const taskActions = slice.actions
export const taskThunk = {removeTask, addTask, updateTask, switchTaskCheck: switchCheck}




export type switchCheckArgType = { listID: string, taskID: string, check: CheckStatus }
export type updateTaskArgType = { listID: string, taskID: string, title: string }
export type removeTaskArgType = { listID: string, taskID: string }



