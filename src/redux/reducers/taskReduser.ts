import {
    ErrorResponseDataAPI, ResulAPICode,
    CheckStatus, IncompleteListAPIType,
    IncompleteOneTaskAPIType, AllTasksType,
} from "../../Types";
import {tasksAPI} from "../../DAL/TasksAPI";
import {GeneralTaskACType} from "../actionCreators/ActionCreators";
import {Dispatch} from "redux";
import {RootStateType} from "../store";
import {GlobalRequestStatusType, setGlobalStatusAC} from "./globalReducer";
import {runDefaultCatch, setErrorTextDependingMessage} from "../../utilities/error-utilities";
import {AxiosError} from "axios";
import {setAPIListsAndArrToTasksAC, setEntityListStatusAC} from "./listReducers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// юзРедьюсер(юзали до редакса) принимает нужный редьюсер и начальное значение
const initState: AllTasksType = {
    // [idToDoList1]: [                             //походу если не обернуть в [] он создвст отдельный ключ никак не связаный с переменной в которой вложена строка
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
}


//!!!!!!!!!!!!!!!!!!!!сменить логику масивов на find поиск индекса по значению. ТОЧЕЧНО СТАРТЬСЯ ИЗМЕНЯТЬ НУЖНОЕ ЗНАЧЕНИЕ
const slice = createSlice({
    name: 'task',
    initialState: initState,
    reducers: {
        addTaskAC(state: AllTasksType, action: PayloadAction<{ newTask: IncompleteOneTaskAPIType }>) {
            state[action.payload.newTask.todoListId].unshift({...action.payload.newTask, entityStatus: 'idle'})
        },
        removeTaskAC(state: AllTasksType, action: PayloadAction<{ taskID: string, listID: string }>) {
            state[action.payload.listID] = state[action.payload.listID].filter((e) => e.id !== action.payload.taskID)
        },
        switchCheckboxAC(state: AllTasksType, action: PayloadAction<{ taskID: string, checked: CheckStatus, listID: string }>) {
            const x = state[action.payload.listID].find(e => e.id === action.payload.taskID)
            if (x)
                x.status = action.payload.checked //шото не то
        },
        addEditedTaskAC(state: AllTasksType, action: PayloadAction<{ value: string, listID: string, taskID: string }>) {
            const editedTask = state[action.payload.listID].find(e => e.id === action.payload.taskID)
            if (editedTask)
                editedTask.title = action.payload.value
        },
        setAPITasksAC(state: AllTasksType, action: PayloadAction<{ tasksArr: IncompleteOneTaskAPIType[], listID: string }>) {
            const mappedTasks = action.payload.tasksArr.map(e => ({
                ...e,
                entityStatus: 'idle' as GlobalRequestStatusType
            }))

            state[action.payload.listID] = [...mappedTasks]
        },
        addListCreateEmptyTasksAC(state: AllTasksType, action: PayloadAction<{ newList: IncompleteListAPIType }>) {
            state[action.payload.newList.id] = []
        },
        setEntityTaskStatusAC(state: AllTasksType, action: PayloadAction<{ entityID: string, listID: string, newStatus: GlobalRequestStatusType }>) {
            state[action.payload.listID] =
                state[action.payload.listID].map(e => e.id === action.payload.entityID
                    ? {...e, entityStatus: action.payload.newStatus}
                    : e)
        },
        clearAllStateAC() {
            return {}
        }
    },
    extraReducers: (builder) => { // Дополнительные редьюсеры
        builder.addCase(setAPIListsAndArrToTasksAC, (state: AllTasksType, action: PayloadAction<{ lists: IncompleteListAPIType[], newListIDArr: string[] }>) => {
            let newObj: AllTasksType = {}
            action.payload.newListIDArr.forEach((e: string) => {
                newObj[e] = []
            })
            return {...state, ...newObj}
        })
            // .addCase()
    },
})


export const taskReducer = slice.reducer
export const {
    addTaskAC, addListCreateEmptyTasksAC,
    removeTaskAC,
    setEntityTaskStatusAC, setAPITasksAC,
    switchCheckboxAC, clearAllStateAC,
    addEditedTaskAC,
} = slice.actions


export const deleteAPITaskTC = (listID: string, taskID: string) => (dispatch: Dispatch<GeneralTaskACType>) => {
    dispatch(setGlobalStatusAC({status: 'loading'}))
    dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'loading'}))
    tasksAPI.deleteTask(listID, taskID)
        .then(r => {
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(removeTaskAC({listID: listID, taskID: taskID}))
                dispatch(setGlobalStatusAC({status: 'succeeded'}))
                dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'succeeded'}))
            } else {
                setErrorTextDependingMessage(dispatch, r)
                dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'failed'}))
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
            dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'failed'}))
        })
}

export const addAPITaskTC = (listID: string, taskValue: string) => (dispatch: Dispatch<GeneralTaskACType>) => {
    dispatch(setGlobalStatusAC({status: 'loading'}))
    dispatch(setEntityListStatusAC({entityID: listID, newStatus: 'loading'}))
    tasksAPI.postTask(listID, taskValue)
        .then(r => {
            if (r.resultCode === ResulAPICode.Ok) { //0 только приуспешном выполнении, ошибки всё кроме 0
                dispatch(addTaskAC({newTask: r.data.item}))
                dispatch(setGlobalStatusAC({status: 'succeeded'}))
                dispatch(setEntityListStatusAC({entityID: listID, newStatus: 'succeeded'}))
            } else {
                setErrorTextDependingMessage(dispatch, r)
                dispatch(setEntityListStatusAC({entityID: listID, newStatus: 'failed'}))
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
            dispatch(setEntityListStatusAC({entityID: listID, newStatus: 'failed'}))
        })
}

export const updateAPIEditableTaskTC = (listID: string, taskID: string, newValue: string) => {
    return (dispatch: Dispatch<GeneralTaskACType>, getState: () => RootStateType) => {

        dispatch(setGlobalStatusAC({status: 'loading'}))
        dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'loading'}))
        const task = getState().tasks[listID].find(e => e.id === taskID)

        if (task) {
            const updatedTask = {...task, title: newValue}
            tasksAPI.updateTask(listID, taskID, updatedTask)
                .then(r => {
                    if (r.resultCode === ResulAPICode.Ok) {
                        dispatch(addEditedTaskAC({taskID: taskID, listID: listID, value: newValue}))
                        dispatch(setGlobalStatusAC({status: 'succeeded'}))
                        dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'succeeded'}))

                    } else {
                        setErrorTextDependingMessage(dispatch, r)
                        dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'failed'}))
                    }
                })
                .catch((err: AxiosError<ErrorResponseDataAPI>) => {
                    runDefaultCatch(dispatch, err)
                    dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'failed'}))
                })
        }
    }
}

export const switchCheckAPITaskTC = (listID: string, taskID: string, statusValue: CheckStatus) => {
    return (dispatch: Dispatch<GeneralTaskACType>, getState: () => RootStateType) => {

        dispatch(setGlobalStatusAC({status: 'loading'}))
        dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'loading'}))

        const task = getState().tasks[listID].find(e => e.id === taskID)
        if (task) {
            const updatedTask = {...task, status: statusValue}

            tasksAPI.updateTask(listID, taskID, updatedTask)
                .then(r => {
                    if (r.resultCode === ResulAPICode.Ok) {
                        dispatch(switchCheckboxAC({taskID: taskID, listID: listID, checked: statusValue}))
                        dispatch(setGlobalStatusAC({status: 'succeeded'}))
                        dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'succeeded'}))

                    } else {
                        setErrorTextDependingMessage(dispatch, r)
                        dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'failed'}))
                    }
                })
                .catch((err: AxiosError<ErrorResponseDataAPI>) => {
                    runDefaultCatch(dispatch, err)
                    dispatch(setEntityTaskStatusAC({entityID: taskID, listID: listID, newStatus: 'failed'}))
                })
        }
    }
}


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