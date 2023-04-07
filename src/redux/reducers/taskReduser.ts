import {AllTasksType, CheckStatus, ErrorResponseDataAPI, ResulAPICode} from "../../Types";
import {tasksAPI} from "../../DAL/TasksAPI";
import {
    GeneralTaskACType,
    addEditedTaskAC,
    addTaskAC,
    removeTaskAC,
    setAPITasksAC,
    switchCheckboxAC, setEntityTaskStatusAC, setEntityListStatusAC
} from "../actionCreators/ActionCreators";
import {Dispatch} from "redux";
import {RootStateType} from "../store";
import {GlobalRequestStatusType, setGlobalStatusAC} from "./globalReducer";
import {runDefaultCatch, setErrorTextDependingMessage} from "../../utilities/error-utilities";
import {AxiosError} from "axios";

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


export const taskReducer = (state: AllTasksType = initState, action: GeneralTaskACType): AllTasksType => {


    switch (action.type) {
        case 'ADD-TASK' :
            //нужному тудулисту присваиваем новый массив, [новая таска, ...старые таски]
            return {
                ...state, [action.payload.newTask.todoListId]:
                    [{...action.payload.newTask, entityStatus: 'idle'}, ...state[action.payload.newTask.todoListId]]
            }

        case 'REMOVE-TASK' : {
            const specificToDOList = state[action.payload.listID] //находим тудулист
            return {
                ...state,
                [action.payload.listID]: specificToDOList.filter((e) => e.id !== action.payload.taskID)
            }   //меняем в нужном тудулисте масив таксок на отфильтрованый(новый массив без удаленной таски)
        }
        case 'SWITCH-TASKS-CHECKBOX' : {
            return {
                ...state,
                [action.payload.listID]:
                    state[action.payload.listID].map(e => e.id === action.payload.taskID ? {
                        ...e,
                        status: action.payload.checked
                    } : e)
            }
        }
        case 'ADD-EDITED-TASK': {
            const editedTask = state[action.payload.listID].map((e) => {
                return e.id === action.payload.taskID ? {...e, title: action.payload.value} : e
            })
            return {
                ...state, [action.payload.listID]: editedTask
            }
        }
        case "SET-API-LISTS-AND-ARR-TO-TASKS": { // сначала запрашиваем листы затем таски, между такси возвращают андефайнд
            let newObj: AllTasksType = {}
            action.payload.newListIDArr.forEach((e: string) => {
                newObj[e] = [] // если внутри обьекта(асс масс) свойство в [], то свойством будет то что вернет выражение в скобках
            })
            return {...state, ...newObj}
        }
        case "SET-API-TASKS-AC": {
            const mappedTasks = action.payload.tasksArr.map(e => ({
                ...e,
                entityStatus: 'idle' as GlobalRequestStatusType
            }))
            return {...state, [action.payload.listID]: [...mappedTasks]}
        }
        case "ADD-LIST-AND-CREATE-EMPTY-TASKS-ARR":
            return {...state, [action.payload.newList.id]: []}
        case "CHANGE-ENTITY-TASK-STATUS":
            return {
                ...state, [action.payload.listID]:
                    state[action.payload.listID].map(e => e.id === action.payload.entityID
                        ? {...e, entityStatus: action.payload.newStatus}
                        : e)
            }
        default:
            return state
    }
}


export const getAPITasksTC = (listID: string) => (dispatch: Dispatch<GeneralTaskACType>) => {
    dispatch(setGlobalStatusAC("loading"))
    tasksAPI.getTasks(listID)
        .then(r => {
            dispatch(setAPITasksAC(r.data.items, listID))
            dispatch(setGlobalStatusAC("succeeded"))
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            const error = err.response ? err.response.data.message: err.message
            runDefaultCatch(dispatch, error)
        })

}

export const deleteAPITaskTC = (listID: string, taskID: string) => (dispatch: Dispatch<GeneralTaskACType>) => {
    dispatch(setGlobalStatusAC('loading'))
    dispatch(setEntityTaskStatusAC(taskID, listID, 'loading'))
    tasksAPI.deleteTask(listID, taskID)
        .then(r => {
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(removeTaskAC(taskID, listID))
                dispatch(setGlobalStatusAC('succeeded'))
                dispatch(setEntityTaskStatusAC(taskID, listID, 'succeeded'))
            } else {
                setErrorTextDependingMessage(dispatch, r)
                dispatch(setEntityTaskStatusAC(taskID, listID, 'failed'))
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            const error = err.response ? err.response.data.message: err.message
            runDefaultCatch(dispatch, error)
            dispatch(setEntityTaskStatusAC(taskID, listID, 'failed'))
        })
}

export const addAPITaskTC = (listID: string, taskValue: string) => (dispatch: Dispatch<GeneralTaskACType>) => {
    dispatch(setGlobalStatusAC("loading"))
    dispatch(setEntityListStatusAC(listID, 'loading'))
    tasksAPI.postTask(listID, taskValue)
        .then(r => {
            if (r.resultCode === ResulAPICode.Ok) { //0 только приуспешном выполнении, ошибки всё кроме 0
                dispatch(addTaskAC(r.data.item))
                dispatch(setGlobalStatusAC("succeeded"))
                dispatch(setEntityListStatusAC(listID, 'succeeded'))
            } else {
                setErrorTextDependingMessage(dispatch, r)
                dispatch(setEntityListStatusAC(listID, 'failed'))
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            const error = err.response ? err.response.data.message: err.message
            runDefaultCatch(dispatch, error)
            dispatch(setEntityListStatusAC(listID, 'failed'))
        })
}

export const updateAPIEditableTaskTC = (listID: string, taskID: string, newValue: string) => {
    return (dispatch: Dispatch<GeneralTaskACType>, getState: () => RootStateType) => {

        dispatch(setGlobalStatusAC("loading"))
        dispatch(setEntityTaskStatusAC(taskID, listID, 'loading'))
        const task = getState().tasks[listID].find(e => e.id === taskID)

        if (task) {
            const updatedTask = {...task, title: newValue}
            tasksAPI.updateTask(listID, taskID, updatedTask)
                .then(r => {
                    if (r.resultCode === ResulAPICode.Ok) {
                        dispatch(addEditedTaskAC(newValue, listID, taskID))
                        dispatch(setGlobalStatusAC("succeeded"))
                        dispatch(setEntityTaskStatusAC(taskID, listID, 'succeeded'))

                    } else {
                        setErrorTextDependingMessage(dispatch, r)
                        dispatch(setEntityTaskStatusAC(taskID, listID, 'failed'))
                    }
                })
                .catch((err: AxiosError<ErrorResponseDataAPI>) => {
                    const error = err.response ? err.response.data.message: err.message
                    runDefaultCatch(dispatch, error)
                    dispatch(setEntityTaskStatusAC(taskID, listID, 'failed'))
                })
        }
    }
}

export const switchCheckAPITaskTC = (listID: string, taskID: string, statusValue: CheckStatus) => {
    return (dispatch: Dispatch<GeneralTaskACType>, getState: () => RootStateType) => {

        dispatch(setGlobalStatusAC("loading"))
        dispatch(setEntityTaskStatusAC(taskID, listID, 'loading'))

        const task = getState().tasks[listID].find(e => e.id === taskID)
        if (task) {
            const updatedTask = {...task, status: statusValue}

            tasksAPI.updateTask(listID, taskID, updatedTask)
                .then(r => {
                    if (r.resultCode === ResulAPICode.Ok) {
                        dispatch(switchCheckboxAC(taskID, statusValue, listID))
                        dispatch(setGlobalStatusAC("succeeded"))
                        dispatch(setEntityTaskStatusAC(taskID, listID, 'succeeded'))

                    } else {
                        setErrorTextDependingMessage(dispatch, r)
                        dispatch(setEntityTaskStatusAC(taskID, listID, 'failed'))
                    }
                })
                .catch((err: AxiosError<ErrorResponseDataAPI>) => {
                    const error = err.response ? err.response.data.message: err.message
                    runDefaultCatch(dispatch, error)
                    dispatch(setEntityTaskStatusAC(taskID, listID, 'failed'))
                })
        }
    }
}