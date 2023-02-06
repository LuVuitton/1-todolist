import {v1} from "uuid";
import {mainACTaskType, TasksType} from "../Types";


export const taskReducer = (state: TasksType, action: mainACTaskType): TasksType => {


    switch (action.type) {
        case 'ADD-TASK' : {
            //посмотреть еще раз
            const newTask = {taskID: v1(), type: "checkbox", checked: false, taskValue: action.payload.inputValue}      //создаем новую таску
            const listFromTasksArr = state[action.payload.toDoListId]        //в массиве тасок находим [нужный тудулист] по ключу, выносим в переменную (массив тасок это [IDтудулистаВстроке]: [массив обьектов{тасок}]

            return {...state, [action.payload.toDoListId]:[newTask, ...listFromTasksArr]} //нужному тудулисту присваиваем новый массив, [новая таска, ...старые таски]
        }
        case 'REMOVE-TASK' : {
            const specificToDOList = state[action.payload.toDoListId] //находим тудулист
            return {...state,[action.payload.toDoListId]: specificToDOList.filter((e) => e.taskID !== action.payload.taskID)}   //меняем в нужном тудулисте масив таксок на отфильтрованый(новый массив без удаленной таски)
        }
        case 'SWITCH-TASKS-CHECKBOX' : {
              return   {...state,
                  [action.payload.toDoListId]:
                      state[action.payload.toDoListId].map(e=>e.taskID===action.payload.taskId?{...e,checked:!action.payload.checked}:e) }
        }
        case 'ADD-EDITED-TASK': {
            const editedTask = state[action.payload.toDoListId].map((e) => {
                return e.taskID === action.payload.taskId ? {...e, taskValue: action.payload.value} : e
            })
            return {
                ...state, [action.payload.toDoListId]: editedTask
            }
        }
        case 'ADD-ARR-TASKS': {

            return {...state, [action.payload.newListId]: []}   // если внутри обьекта(асс масс) свойство в [], то свойством будет то что вернет выражение в скобках
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