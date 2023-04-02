import {v1} from "uuid";
import {AllTasksType, StatusesForTask} from "../../Types";
import {idToDoList1, idToDoList2} from "./listReducers";
import {OneTaskType, tasksAPI} from "../../API-Functional/TasksAPI";
import {
    addEditedTaskAC,
    addTaskAC,
    mainACTaskType,
    removeTaskAC,
    setAPITasksAC, switchCheckboxAC
} from "../../actionCreators/ActionCreators";
import {Dispatch} from "redux";
import {rootStateType} from "../store";

// юзРедьюсер(юзали до редакса) принимает нужный редьюсер и начальное значение
const initState: AllTasksType = {
    [idToDoList1]: [                             //походу если не обернуть в [] он создвст отдельный ключ никак не связаный с переменной в которой вложена строка
        {
            id: v1(),
            title: 'HtML&CSS',
            description: 'to learn',
            todoListId: idToDoList1,
            order: 1,
            status: StatusesForTask.Completed,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        }, {
            id: v1(),
            title: 'MongoDB',
            description: 'to learn',
            todoListId: idToDoList1,
            order: 1,
            status: StatusesForTask.New,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        },
    ],
    [idToDoList2]: [
        {
            id: v1(),
            title: 'Prototypes',
            description: 'to learn',
            todoListId: idToDoList1,
            order: 1,
            status: StatusesForTask.New,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        }, {
            id: v1(),
            title: 'Context this',
            description: 'to learn',
            todoListId: idToDoList1,
            order: 1,
            status: StatusesForTask.New,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        }
    ]
}


export const taskReducer = (state: AllTasksType = initState, action: mainACTaskType): AllTasksType => {


    switch (action.type) {
        case 'ADD-TASK' : {
            //посмотреть еще раз
            const newTask: OneTaskType = action.payload.newTask
            const listFromTasksArr = state[action.payload.newTask.todoListId] //отсальные такси из списка

            return {...state, [action.payload.newTask.todoListId]: [newTask, ...listFromTasksArr]} //нужному тудулисту присваиваем новый массив, [новая таска, ...старые таски]
        }
        case 'REMOVE-TASK' : {
            const specificToDOList = state[action.payload.toDoListId] //находим тудулист
            return {
                ...state,
                [action.payload.toDoListId]: specificToDOList.filter((e) => e.id !== action.payload.taskID)
            }   //меняем в нужном тудулисте масив таксок на отфильтрованый(новый массив без удаленной таски)
        }
        case 'SWITCH-TASKS-CHECKBOX' : {
            return {
                ...state,
                [action.payload.toDoListId]:
                    state[action.payload.toDoListId].map(e => e.id === action.payload.taskId ? {
                        ...e,
                        status: action.payload.checked
                    } : e)
            }
        }
        case 'ADD-EDITED-TASK': {
            const editedTask = state[action.payload.toDoListId].map((e) => {
                return e.id === action.payload.taskId ? {...e, title: action.payload.value} : e
            })
            return {
                ...state, [action.payload.toDoListId]: editedTask
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
            return {...state, [action.payload.listID]: action.payload.tasksArr}
        }
        case "ADD-LIST-AND-CREATE-EMPTY-TASKS-ARR": {
            return {...state, [action.payload.newList.id]: []}
        }

        default:
            return state
    }
}


export const getAPITasksTC = (listID: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(listID)
        .then(r => dispatch(setAPITasksAC(r, listID)))
}

export const deleteAPITaskTC = (listID: string, taskID: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(listID, taskID)
        .then(() => dispatch(removeTaskAC(taskID, listID)))
}

export const addAPITaskTC = (listID: string, taskValue: string) => (dispatch: Dispatch) => {
    tasksAPI.postTask(listID, taskValue)
        .then((r) => {
            dispatch(addTaskAC(r))
        })
}

export const updateAPIEditableTaskTC = (listID: string, taskID: string, newValue: string) => {
   return (dispatch: Dispatch, getState:()=>rootStateType) => {
       const task = getState().tasks[listID].find(e=> e.id === taskID)
       if (task) {
           const updatedTask = {...task, title: newValue}
           tasksAPI.updateTask(listID, taskID, updatedTask)
               .then(() => dispatch(addEditedTaskAC(newValue, listID, taskID)))
       }
    }
}

export const switchCheckAPITaskTC =  (listID: string, taskID: string, statusValue:StatusesForTask) => {

    return (dispatch: Dispatch, getState:()=>rootStateType) => {
        const task = getState().tasks[listID].find(e=> e.id === taskID)
        if (task) {
            const updatedTask = {...task, status: statusValue}

            tasksAPI.updateTask(listID, taskID, updatedTask)
                .then(() => dispatch(switchCheckboxAC(taskID,statusValue, listID)))
        }
    }
}