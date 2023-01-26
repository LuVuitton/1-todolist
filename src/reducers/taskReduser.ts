import {TasksType} from "../App";
import {v1} from "uuid";

type mainACTaskType = addTaskACType | removeTaskACType | switchCheckboxACType | addEditedTaskACType | addArrTasksACType;
type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type switchCheckboxACType = ReturnType<typeof switchCheckboxAC>
type addEditedTaskACType = ReturnType<typeof addEditedTaskAC>
type addArrTasksACType = ReturnType<typeof addArrTasksAC>


export const taskReducer = (state: TasksType, action: mainACTaskType) => {

    switch (action.type) {
        case 'ADD-TASK' : {
            const newTask = {taskID: v1(), type: "checkbox", checked: false, taskValue: action.payload.inputValue}      //создаем новую таску
            const listFromTasksArr = state[action.payload.toDoListId]                       //в массиве тасок находим [нужный тудулист] по ключу, выносим в переменную (массив тасок это [IDтудулистаВстроке]: [массив обьектов{тасок}]
            state[action.payload.toDoListId] = [newTask, ...listFromTasksArr]               //нужному тудулисту присваиваем новый массив, [новая таска, ...старые таски]

            return {...state}
        }
        case 'REMOVE-TASK' : {
            const specificToDOList = state[action.payload.toDoListId] //находим тудулист
            state[action.payload.toDoListId] = specificToDOList.filter((e) => e.taskID !== action.payload.taskID) //меняем в нужном тудулисте масив таксок на отфильтрованый
            return {...state}
        }
        case 'SWITCH-TASKS-CHECKBOX' : {
            const taskForChange = state[action.payload.toDoListId].find(e => e.taskID === action.payload.taskId)
            if (taskForChange) {
                taskForChange.checked = !action.payload.checked
            }
            return {...state}
        }
        case 'ADD-EDITED-TASK': {
            state[action.payload.toDoListId].map((e) => {
                if (e.taskID === action.payload.taskId) {
                    e.taskValue = action.payload.value
                }
            })
            return {...state}
        }
        case 'ADD-ARR-TASKS': {

            state = ({...state, [action.payload.newListId]: []})   // если внутри обьекта(асс масс) свойство в [], то свойством будет то что вернет выражение в скобках


            return {...state}
        }
        default:
            throw new Error('taskReducer not worked')
    }
}


export const addTaskAC = (inputValue: string, toDoListId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            inputValue,        //  inputValue:inputValue
            toDoListId
        }
    } as const
}
export const removeTaskAC = (taskID: string, toDoListId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskID,
            toDoListId
        }
    } as const
}
export const switchCheckboxAC = (taskId: string, checked: boolean, toDoListId: string) => {
    return {
        type: 'SWITCH-TASKS-CHECKBOX',
        payload: {
            taskId,
            checked,
            toDoListId
        }
    } as const
}
export const addEditedTaskAC = (value: string, toDoListId: string, taskId: string) => {
    return {
        type: 'ADD-EDITED-TASK',
        payload: {
            value,
            toDoListId,
            taskId
        }
    } as const
}

export const addArrTasksAC = (newListId: string) => {
    return {
        type: 'ADD-ARR-TASKS',
        payload: {
            newListId
        }
    } as const
}