import {AllTasksType, OneToDoListAPIType, StatusesForTask} from "../Types";



export const listStateForTest: OneToDoListAPIType[] = [
    {
        id: 'listID1',
        title: 'what to learn',
        filter: 'all',
        addedDate: '',
        order: 1},
    {
        id: 'listID2',
        title: 'numbers',
        filter: 'all',
        addedDate: '',
        order: 1}
]

export const tasksStateForTest: AllTasksType = {
    ['listID1']: [

        {
            id: 'taskID1',
            title: 'HTML&CSS',
            description: 'to learn',
            todoListId: 'listID1',
            order: 1,
            status: StatusesForTask.Completed,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        }, {
            id:'taskID2',
            title: 'MongoDB',
            description: 'to learn',
            todoListId: 'listID1',
            order: 1,
            status: StatusesForTask.New,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        }, {
            id: 'taskID3',
            title: 'Redux',
            description: 'to learn',
            todoListId: 'listID1',
            order: 1,
            status: StatusesForTask.Completed,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        }, {
            id: 'taskID4',
            title: 'JS',
            description: 'to learn',
            todoListId: 'listID1',
            order: 1,
            status: StatusesForTask.Completed,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        },
    ],
    ['listID2']: [
        {
            id: 'taskID1',
            title: 'Prototypes',
            description: 'to learn',
            todoListId: 'listID2',
            order: 1,
            status: StatusesForTask.New,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        }, {
            id: 'taskID2',
            title: 'Context this',
            description: 'to learn',
            todoListId: 'listID2',
            order: 1,
            status: StatusesForTask.New,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        }, {
            id: 'taskID3',
            title: 'Event Loop',
            description: 'to learn',
            todoListId: 'listID2',
            order: 1,
            status: StatusesForTask.Completed,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        }, {
            id: 'taskID4',
            title: 'Promises',
            description: 'to learn',
            todoListId: 'listID2',
            order: 1,
            status: StatusesForTask.Completed,
            priority: 1,
            startDate: '',
            deadline: '',
            addedDate: ''
        },
    ]
}


