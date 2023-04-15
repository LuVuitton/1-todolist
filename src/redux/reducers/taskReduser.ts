import {AllTasksType, CheckStatus, IncompleteOneTaskAPIType, ResulAPICode,} from "../../Types";
import {tasksAPI} from "../../DAL/TasksAPI";
import {GlobalRequestStatusType, setGlobalStatusAC} from "./globalReducer";
import {runDefaultCatch, setErrorTextDependingMessage} from "../../utilities/error-utilities";
import {listActions, listsThunk} from "./listReducers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAsyncThunkWithTypes} from "../../utilities/createAsyncThunkWithTypes";

// юзРедьюсер(юзали до редакса) принимает нужный редьюсер и начальное значение
// const initState: AllTasksType = {}


const removeTask = createAsyncThunkWithTypes<{ listID: string, taskID: string }, { listID: string, taskID: string }>('tasks/removeTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, entityStatus: 'loading'}))
    try {
        const r = await tasksAPI.deleteTask(arg.listID, arg.taskID)
        if (r.resultCode === ResulAPICode.Ok) {
            dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
            dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, entityStatus: 'succeeded'}))
            return {listID: arg.listID, taskID: arg.taskID}
        } else {
            setErrorTextDependingMessage(dispatch, r)
            dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, entityStatus: 'failed'}))
            return rejectWithValue(null) //заглушка
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
        dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, entityStatus: 'failed'}))
        return rejectWithValue(null) //заглушка
    }
})
const addTask = createAsyncThunkWithTypes<{ newTask: IncompleteOneTaskAPIType }, { listID: string, title: string }>('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    dispatch(listActions.setListStatusAC({listID: arg.listID, entityStatus: 'loading'}))
    try {
        const r = await tasksAPI.postTask(arg.listID, arg.title)
        if (r.resultCode === ResulAPICode.Ok) { //0 только приуспешном выполнении, ошибки всё кроме 0
            dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
            dispatch(listActions.setListStatusAC({listID: arg.listID, entityStatus: 'succeeded'}))
            return {newTask: r.data.item}
        } else {
            setErrorTextDependingMessage(dispatch, r)
            dispatch(listActions.setListStatusAC({listID: arg.listID, entityStatus: 'failed'}))
            return rejectWithValue(null)
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
        dispatch(listActions.setListStatusAC({listID: arg.listID, entityStatus: 'failed'}))
        return rejectWithValue(null)

    }
})
//надо убрать это чудовищные условия брат!!!!!!!!!!!!
const updateTask = createAsyncThunkWithTypes<{ listID: string, taskID: string, title: string }, { listID: string, taskID: string, title: string }>('task/updateTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, entityStatus: 'loading'}))
    const task = getState().tasks[arg.listID].find(e => e.id === arg.taskID)
    if (task) {
        const updatedTask = {...task, title: arg.title}
        try {
            const r = await tasksAPI.updateTask(arg.listID, arg.taskID, updatedTask)
            if (r.resultCode === ResulAPICode.Ok && updatedTask) {
                dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
                dispatch(taskActions.setTaskStatusAC({
                    taskID: arg.taskID,
                    listID: arg.listID,
                    entityStatus: 'succeeded'
                }))
                return {taskID: arg.taskID, listID: arg.listID, title: arg.title}
            } else {
                setErrorTextDependingMessage(dispatch, r)
                dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, entityStatus: 'failed'}))
                return rejectWithValue(null)
            }
        } catch (err) {
            runDefaultCatch(dispatch, err)
            dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, entityStatus: 'failed'}))
            return rejectWithValue(null)
        }
    } else {
        return rejectWithValue(null)
    }
})
const switchTaskCheck = createAsyncThunkWithTypes<{ listID: string, taskID: string, check: CheckStatus }, { listID: string, taskID: string, check: CheckStatus }>('tasks/switchTaskCheck', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
    dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, entityStatus: 'loading'}))
    const task = getState().tasks[arg.listID].find(e => e.id === arg.taskID)
    if (task) {
        try {
            const updatedTask = {...task, status: arg.check}
            const r = await tasksAPI.updateTask(arg.listID, arg.taskID, updatedTask)
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(taskActions.setTaskStatusAC({
                    taskID: arg.taskID,
                    listID: arg.listID,
                    entityStatus: 'succeeded'
                }))
                dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
                return {taskID: arg.taskID, listID: arg.listID, check: arg.check}
            } else {
                setErrorTextDependingMessage(dispatch, r)
                dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, entityStatus: 'failed'}))
                return rejectWithValue(null)
            }
        } catch (err) {
            runDefaultCatch(dispatch, err)
            dispatch(taskActions.setTaskStatusAC({taskID: arg.taskID, listID: arg.listID, entityStatus: 'failed'}))
            return rejectWithValue(null)
        }
    } else {
        return rejectWithValue(null)
    }
})


const slice = createSlice({
    name: 'tasks',
    initialState: {} as AllTasksType,
    reducers: {
        setAPITasksAC(state, action: PayloadAction<{ tasksArr: IncompleteOneTaskAPIType[], listID: string }>) {
            const mappedTasks = action.payload.tasksArr.map(e => ({
                ...e,
                entityStatus: 'idle' as GlobalRequestStatusType
            }))
            state[action.payload.listID] = [...mappedTasks]
        },
        setTaskStatusAC(state, action: PayloadAction<{ taskID: string, listID: string, entityStatus: GlobalRequestStatusType }>) {
            const task = state[action.payload.listID].find(e => e.id === action.payload.taskID)
            if (task)
                task.entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: (builder) => { // Дополнительные редьюсеры
        builder
            .addCase(listActions.setAPIListsAndArrToTasksAC, (state, action) => {
                let newObj: AllTasksType = {}
                action.payload.newListIDArr.forEach(e => newObj[e] = [])
                return {...state, ...newObj}
            })
            .addCase(listsThunk.addListAndEmptyTasks.fulfilled, (state, action) => {
                state[action.payload.newList.id] = []
            })
            .addCase(listsThunk.deleteAPIListTC.fulfilled, (state, action) => {
                delete state[action.payload.listID] //удаляем такски удаленного массива
            })
            .addCase(listActions.clearAllStateAC, () => {
                return {}
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const i = state[action.payload.listID].findIndex(e => e.id === action.payload.taskID)
                state[action.payload.listID].splice(i, 1)
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.newTask.todoListId].unshift({...action.payload.newTask, entityStatus: 'idle'})
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const task = state[action.payload.listID].find(e => e.id === action.payload.taskID)
                if (task)
                    task.title = action.payload.title
            })
            .addCase(switchTaskCheck.fulfilled, (state, action) => {
                const task = state[action.payload.listID].find(e => e.id === action.payload.taskID)
                if (task)
                    task.status = action.payload.check
            })
    },
})


export const taskReducer = slice.reducer
export const taskActions = slice.actions
export const taskThunk = {removeTask, addTask, updateTask,switchTaskCheck}

// export const deleteAPITaskTC = (listID: string, taskID: string) => (dispatch: Dispatch) => {
//     dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
//     dispatch(setEntityTaskStatusAC({taskID, listID, entityStatus: 'loading'}))
//     tasksAPI.deleteTask(listID, taskID)
//         .then(r => {
//             if (r.resultCode === ResulAPICode.Ok) {
//                 dispatch(removeTaskAC({listID, taskID}))
//                 dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
//                 dispatch(setEntityTaskStatusAC({taskID, listID, entityStatus: 'succeeded'}))
//             } else {
//                 setErrorTextDependingMessage(dispatch, r)
//                 dispatch(setEntityTaskStatusAC({taskID, listID, entityStatus: 'failed'}))
//             }
//         })
//         .catch((err: AxiosError<ErrorResponseDataAPI>) => {
//             runDefaultCatch(dispatch, err)
//             dispatch(setEntityTaskStatusAC({taskID, listID, entityStatus: 'failed'}))
//         })
// }
// export const addAPITaskTC = (listID: string, taskValue: string) => (dispatch: Dispatch) => {
//     dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
//     dispatch(listActions.setListStatusAC({listID, entityStatus: 'loading'}))
//     tasksAPI.postTask(listID, taskValue)
//         .then(r => {
//             if (r.resultCode === ResulAPICode.Ok) { //0 только приуспешном выполнении, ошибки всё кроме 0
//                 dispatch(taskActions.addTask({newTask: r.data.item}))
//                 dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
//                 dispatch(listActions.setListStatusAC({listID, entityStatus: 'succeeded'}))
//             } else {
//                 setErrorTextDependingMessage(dispatch, r)
//                 dispatch(listActions.setListStatusAC({listID, entityStatus: 'failed'}))
//             }
//         })
//         .catch((err: AxiosError<ErrorResponseDataAPI>) => {
//             runDefaultCatch(dispatch, err)
//             dispatch(listActions.setListStatusAC({listID, entityStatus: 'failed'}))
//         })
// }
// export const updateAPIEditableTaskTC = (listID: string, taskID: string, newValue: string) => {
//     return (dispatch: Dispatch, getState: () => RootStateType) => {
//
//         dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
//         dispatch(taskActions.setTaskStatusAC({taskID, listID, entityStatus: 'loading'}))
//         const task = getState().tasks[listID].find(e => e.id === taskID)
//
//         if (task) {
//             const updatedTask = {...task, title: newValue}
//             tasksAPI.updateTask(listID, taskID, updatedTask)
//                 .then(r => {
//                     if (r.resultCode === ResulAPICode.Ok) {
//                         dispatch(taskActions.addEditedTaskAC({taskID, listID, value: newValue}))
//                         dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
//                         dispatch(taskActions.setTaskStatusAC({taskID, listID, entityStatus: 'succeeded'}))
//
//                     } else {
//                         setErrorTextDependingMessage(dispatch, r)
//                         dispatch(taskActions.setTaskStatusAC({taskID, listID, entityStatus: 'failed'}))
//                     }
//                 })
//                 .catch((err: AxiosError<ErrorResponseDataAPI>) => {
//                     runDefaultCatch(dispatch, err)
//                     dispatch(taskActions.setTaskStatusAC({taskID, listID, entityStatus: 'failed'}))
//                 })
//         }
//     }
// }
//
// export const switchCheckAPITaskTC = (listID: string, taskID: string, statusValue: CheckStatus) => {
//     return (dispatch: Dispatch, getState: () => RootStateType) => {
//
//         dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
//         dispatch(taskActions.setTaskStatusAC({taskID, listID, entityStatus: 'loading'}))
//
//         const task = getState().tasks[listID].find(e => e.id === taskID)
//         if (task) {
//             const updatedTask = {...task, status: statusValue}
//
//             tasksAPI.updateTask(listID, taskID, updatedTask)
//                 .then(r => {
//                     if (r.resultCode === ResulAPICode.Ok) {
//                         dispatch(taskActions.switchCheckboxAC({taskID, listID, checked: statusValue}))
//                         dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
//                         dispatch(taskActions.setTaskStatusAC({taskID, listID, entityStatus: 'succeeded'}))
//
//                     } else {
//                         setErrorTextDependingMessage(dispatch, r)
//                         dispatch(taskActions.setTaskStatusAC({taskID, listID, entityStatus: 'failed'}))
//                     }
//                 })
//                 .catch((err: AxiosError<ErrorResponseDataAPI>) => {
//                     runDefaultCatch(dispatch, err)
//                     dispatch(taskActions.setTaskStatusAC({taskID, listID, entityStatus: 'failed'}))
//                 })
//         }
//     }
// }
// state = [idToDoList1]: [                             //походу если не обернуть в [] он создвст отдельный ключ никак не связаный с переменной в которой вложена строка
//     {
//         id: v1(),
//         title: 'HtML&CSS',
//         description: 'to learn',
//         todoListId: idToDoList1,
//         order: 1,
//         status: checkStatus.Completed,
//         priority: PrioritiesForTask.Middle,
//         startDate: '',
//         deadline: '',
//         addedDate: ''
//     },
// ],
// [idToDoList2]: [
//     {
//         id: v1(),
//         title: 'Prototypes',
//         description: 'to learn',
//         todoListId: idToDoList1,
//         order: 1,
//         status: checkStatus.Completed,
//         priority: PrioritiesForTask.Middle,
//         startDate: '',
//         deadline: '',
//         addedDate: ''
//     }
// ]
// export const taskReducer = (state: AllTasksType = initState, action: GeneralTaskACType): AllTasksType => {
//     switch (action.type) {
//         // case 'ADD-TASK' :
//         //     //нужному тудулисту присваиваем новый массив, [новая таска, ...старые таски]
//         //     return {
//         //         ...state, [action.payload.newTask.todoListId]:
//         //             [{...action.payload.newTask, entityStatus: 'idle'}, ...state[action.payload.newTask.todoListId]]
//         //     }
//
//         // case 'REMOVE-TASK' : {
//         //     const specificToDOList = state[action.payload.listID] //находим тудулист
//         //     return {
//         //         ...state,
//         //         [action.payload.listID]: specificToDOList.filter((e) => e.id !== action.payload.taskID)
//         //     }   //меняем в нужном тудулисте масив таксок на отфильтрованый(новый массив без удаленной таски)
//         // }
//         // case 'SWITCH-TASKS-CHECKBOX' : {
//         //     return {
//         //         ...state,
//         //         [action.payload.listID]:
//         //             state[action.payload.listID].map(e => e.id === action.payload.taskID ? {
//         //                 ...e,
//         //                 status: action.payload.checked
//         //             } : e)
//         //     }
//         // }
//
//         // case 'ADD-EDITED-TASK': {
//         //     const editedTask = state[action.payload.listID].map((e) => {
//         //         return e.id === action.payload.taskID ? {...e, title: action.payload.value} : e
//         //     })
//         //     return {
//         //         ...state, [action.payload.listID]: editedTask
//         //     }
//         // }
//         //
//         // case setAPIListsAndArrToTasksAC.type: { // сначала запрашиваем листы затем таски, между такси возвращают андефайнд
//         //     // если внутри обьекта(асс масс) свойство в [], то свойством будет то что вернет выражение в скобках
//         //     let newObj: AllTasksType = {}
//         //     action.payload.newListIDArr.forEach((e: string) => {
//         //         newObj[e] = []
//         //     })
//         //     return {...state, ...newObj}
//         // }
//         // case "SET-API-TASKS-AC": {
//         //     const mappedTasks = action.payload.tasksArr.map((e:any) => ({
//         //         ...e,
//         //         entityStatus: 'idle' as GlobalRequestStatusType
//         //     }))
//         //     return {...state, [action.payload.listID]: [...mappedTasks]}
//         // }
//         //
//         // case addListCreateEmptyTasksAC.type:
//         //     return {...state, [action.payload.newList.id]: []}
//
//         // case "CHANGE-ENTITY-TASK-STATUS":
//         //     return {
//         //         ...state, [action.payload.listID]:
//         //             state[action.payload.listID].map(e => e.id === action.payload.entityID
//         //                 ? {...e, entityStatus: action.payload.newStatus}
//         //                 : e)
//         //     }
//     //     case clearAllStateAC.type:
//     //         return {}
//     //
//     //     default:
//     //         return state
//     // }
// }
// export const setTasksForAllLists = (allListsID: string[])=> {
//     return {
//         type: 'SET-TASKS-FOR-ALL-LISTS',
//         payload: {
//             allListsID
//         }
//     } as const
// }
//
// export const getAPITasksTC = (listID: string) => (dispatch: Dispatch<GeneralTaskACType>) => {
//     dispatch(setGlobalStatusAC("loading"))
//     tasksAPI.getTasks(listID)
//         .then(r => {
//             dispatch(setAPITasksAC(r.data.items, listID))
//             dispatch(setGlobalStatusAC("succeeded"))
//         })
//         .catch((err: AxiosError<ErrorResponseDataAPI>) => {
//             runDefaultCatch(dispatch, err)
//         })
// }