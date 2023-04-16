import {AllTasksType, OneToDoListAPIType, PrioritiesForTask, CheckStatus} from "../Types";
import {AppStateType} from "../redux/reducers/appReducer";
import {AuthStateType} from "../redux/reducers/authReducer";


export const listStateForTest: OneToDoListAPIType[] = [
    {
        id: 'listID1',
        title: 'what to learn',
        filter: 'all',
        addedDate: '',
        order: 1,
        listStatus: 'idle'
    },
    {
        id: 'listID2',
        title: 'numbers',
        filter: 'all',
        addedDate: '',
        order: 1,
        listStatus: 'idle'
    }
]

export const tasksStateForTest: AllTasksType = {
    ['listID1']: [

        {
            id: 'taskID1',
            title: 'HTML&CSS',
            description: 'to learn',
            todoListId: 'listID1',
            order: 1,
            status: CheckStatus.Completed,
            priority: PrioritiesForTask.Middle,
            startDate: '',
            deadline: '',
            addedDate: '',
            taskStatus: 'idle'
        }, {
            id:'taskID2',
            title: 'MongoDB',
            description: 'to learn',
            todoListId: 'listID1',
            order: 1,
            status: CheckStatus.New,
            priority: PrioritiesForTask.Middle,
            startDate: '',
            deadline: '',
            addedDate: '',
            taskStatus: 'idle'

        }, {
            id: 'taskID3',
            title: 'Redux',
            description: 'to learn',
            todoListId: 'listID1',
            order: 1,
            status: CheckStatus.Completed,
            priority: PrioritiesForTask.Middle,
            startDate: '',
            deadline: '',
            addedDate: '',
            taskStatus: 'idle'
        }, {
            id: 'taskID4',
            title: 'JS',
            description: 'to learn',
            todoListId: 'listID1',
            order: 1,
            status: CheckStatus.Completed,
            priority: PrioritiesForTask.Middle,
            startDate: '',
            deadline: '',
            addedDate: '',
            taskStatus: 'idle'
        },
    ],
    ['listID2']: [
        {
            id: 'taskID1',
            title: 'Prototypes',
            description: 'to learn',
            todoListId: 'listID2',
            order: 1,
            status: CheckStatus.New,
            priority: PrioritiesForTask.Middle,
            startDate: '',
            deadline: '',
            addedDate: '',
            taskStatus: 'idle'
        }, {
            id: 'taskID2',
            title: 'Context this',
            description: 'to learn',
            todoListId: 'listID2',
            order: 1,
            status: CheckStatus.New,
            priority: PrioritiesForTask.Middle,
            startDate: '',
            deadline: '',
            addedDate: '',
            taskStatus: 'idle'
        }, {
            id: 'taskID3',
            title: 'Event Loop',
            description: 'to learn',
            todoListId: 'listID2',
            order: 1,
            status: CheckStatus.Completed,
            priority: PrioritiesForTask.Middle,
            startDate: '',
            deadline: '',
            addedDate: '',
            taskStatus: 'idle'
        }, {
            id: 'taskID4',
            title: 'Promises',
            description: 'to learn',
            todoListId: 'listID2',
            order: 1,
            status: CheckStatus.Completed,
            priority: PrioritiesForTask.Middle,
            startDate: '',
            deadline: '',
            addedDate: '',
            taskStatus: 'idle'
        },
    ]
}

export const globalStateForTests: AppStateType = {
    appStatus: 'idle',
    errorMessage: null,
    isInitialized:false
}

export const authStateForTests: AuthStateType = {
    isLoggedIn: false
}