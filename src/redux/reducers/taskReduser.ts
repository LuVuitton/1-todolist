import {v1} from "uuid";
import {AllTasksType, StatusesForTask} from "../../Types";
import {idToDoList1, idToDoList2} from "./listReducers";
import {OneTaskType} from "../../API-Functional/TasksAPI";
import {mainACTaskType} from "../../actionCreators/ActionCreators";

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
        }, {
            id: v1(),
            title: 'Redux',
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
            title: 'JS',
            description: 'to learn',
            todoListId: idToDoList1,
            order: 1,
            status: StatusesForTask.Completed,
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
        }, {
            id: v1(),
            title: 'Event Loop',
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
            title: 'Promises',
            description: 'to learn',
            todoListId: idToDoList1,
            order: 1,
            status: StatusesForTask.Completed,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        },
    ]
}


export const taskReducer = (state: AllTasksType = initState, action: mainACTaskType): AllTasksType => {


    switch (action.type) {
        case 'ADD-TASK' : {
            //посмотреть еще раз
            const newTask: OneTaskType = {
                id: v1(),
                title: action.payload.inputValue,
                description: 'to learn',
                todoListId: action.payload.toDoListId,
                order: 1,
                status: StatusesForTask.New,
                priority: 1,
                startDate: '',
                deadline: '',
                addedDate: ''
            }

            //в массиве тасок находим [нужный тудулист] по ключу, выносим в переменную (массив тасок это [IDтудулистаВстроке]: [массив обьектов{тасок}]
            const listFromTasksArr = state[action.payload.toDoListId]

            return {...state, [action.payload.toDoListId]: [newTask, ...listFromTasksArr]} //нужному тудулисту присваиваем новый массив, [новая таска, ...старые таски]
        }
        case 'REMOVE-TASK' : {
            const specificToDOList = state[action.payload.toDoListId] //находим тудулист
            return {
                ...state,
                [action.payload.toDoListId]: specificToDOList.filter((e) => e.id !== action.payload.taskID)
            }   //меняем в нужном тудулисте масив таксок на отфильтрованый(новый массив без удаленной таски)
        }
        case 'SWITCH-TASKS-CHECKBOX' : {
            // debugger
            return {
                ...state,
                [action.payload.toDoListId]:
                    state[action.payload.toDoListId].map(e => e.id === action.payload.taskId ? {
                        ...e,
                        status: action.payload.checked === StatusesForTask.Completed ? StatusesForTask.New : StatusesForTask.Completed
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
        case 'ADD-ARR-TASKS': {
            console.log(action.payload.newListIDArr)
            let newObj:AllTasksType = {}
            action.payload.newListIDArr.forEach((e:string)=>{
                newObj[e] = [] // если внутри обьекта(асс масс) свойство в [], то свойством будет то что вернет выражение в скобках
            })
            return {...state, ...newObj}
        }
        case "SET-API-TASKS-AC": {
            return {...state, [action.payload.listID]: action.payload.tasksArr}
        }

        default:
            return state
    }
}


