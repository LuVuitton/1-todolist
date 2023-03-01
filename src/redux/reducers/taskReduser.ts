import {v1} from "uuid";
import {mainACTaskType, TasksType} from "../../Types";
import {idToDoList1, idToDoList2} from "./listReducers";


const initState: TasksType = {          // юзРедьюсер(юзали до редакса) принимает нужный редьюсер и начальное значение
    [idToDoList1]: [                             //походу если не обернуть он создвст отдельный ключ никак не связаный с переменной в которой вложена строка
        {taskID: v1(), type: "checkbox", checked: true, taskValue: 'HTML&CSS',},
        {taskID: v1(), type: "checkbox", checked: false, taskValue: 'Redux'},
        {taskID: v1(), type: "checkbox", checked: true, taskValue: 'JS'},
        {taskID: v1(), type: "checkbox", checked: false, taskValue: 'MongoDB'},
        {taskID: v1(), type: "checkbox", checked: false, taskValue: 'React'},
    ],
    [idToDoList2]: [
        {taskID: v1(), type: "checkbox", checked: true, taskValue: 'pervoe',},
        {taskID: v1(), type: "checkbox", checked: false, taskValue: 'vtoroe'},
        {taskID: v1(), type: "checkbox", checked: true, taskValue: 'trete'},
        {taskID: v1(), type: "checkbox", checked: false, taskValue: 'chetvertoe'},
        {taskID: v1(), type: "checkbox", checked: false, taskValue: 'piatoe'},
    ]
}


export const taskReducer = (state: TasksType = initState, action: mainACTaskType): TasksType => {


    switch (action.type) {
        case 'ADD-TASK' : {
            //посмотреть еще раз
            const newTask = {taskID: v1(), type: "checkbox", checked: false, taskValue: action.payload.inputValue}      //создаем новую таску
            const listFromTasksArr = state[action.payload.toDoListId]        //в массиве тасок находим [нужный тудулист] по ключу, выносим в переменную (массив тасок это [IDтудулистаВстроке]: [массив обьектов{тасок}]

            return {...state, [action.payload.toDoListId]: [newTask, ...listFromTasksArr]} //нужному тудулисту присваиваем новый массив, [новая таска, ...старые таски]
        }
        case 'REMOVE-TASK' : {
            const specificToDOList = state[action.payload.toDoListId] //находим тудулист
            return {
                ...state,
                [action.payload.toDoListId]: specificToDOList.filter((e) => e.taskID !== action.payload.taskID)
            }   //меняем в нужном тудулисте масив таксок на отфильтрованый(новый массив без удаленной таски)
        }
        case 'SWITCH-TASKS-CHECKBOX' : {
            return {
                ...state,
                [action.payload.toDoListId]:
                    state[action.payload.toDoListId].map(e => e.taskID === action.payload.taskId ? {
                        ...e,
                        checked: !action.payload.checked
                    } : e)
            }
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

            return {...state, [action.payload.newListID]: []}   // если внутри обьекта(асс масс) свойство в [], то свойством будет то что вернет выражение в скобках

        }
        default:
            return state
    }
}


