import {TasksType, ToDoListType} from "../Types";


export const listStateForTest:ToDoListType[] = [
    {toDoListID: 'listID1', titleList: 'what to learn', filter: 'all'}, //тут без [] потому как переменная стоит не в ключе а в значении
    {toDoListID: 'listID2', titleList: 'numbers', filter: 'all'}
]

export const tasksStateForTest:TasksType = {                      // юзРедьюсер принимает нужный редьюсер и начальное значение
    ['listID1']: [                             //походу если не обернуть он создвст отдельный ключ никак не связаный с переменной в которой вложена строка
        {taskID: 'taskID1', type: "checkbox", checked: true, taskValue: 'HTML&CSS',},
        {taskID: 'taskID2', type: "checkbox", checked: false, taskValue: 'Redux'},
        {taskID: 'taskID3', type: "checkbox", checked: true, taskValue: 'JS'},
        {taskID: 'taskID4', type: "checkbox", checked: false, taskValue: 'MongoDB'},
        {taskID: 'taskID5', type: "checkbox", checked: false, taskValue: 'React'},
    ],
    ['listID2']: [
        {taskID: 'taskID1', type: "checkbox", checked: true, taskValue: 'pervoe',},
        {taskID: 'taskID2', type: "checkbox", checked: false, taskValue: 'vtoroe'},
        {taskID: 'taskID3', type: "checkbox", checked: true, taskValue: 'trete'},
        {taskID: 'taskID4', type: "checkbox", checked: false, taskValue: 'chetvertoe'},
        {taskID: 'taskID5', type: "checkbox", checked: false, taskValue: 'piatoe'},
    ]
}

