import * as taskSelectors from './tasks.selectors'
import {taskReducer, taskActions, taskThunk} from './taskReduser'
import {Task} from './Task'

// пакуем в один обьект для того что бы отдать
// хуку который привяжет ко всем санкам и экшенам диспатчи, что бы была одна строка а не две прост
const taskActionsGroup = {
    ...taskActions,
    ...taskThunk
}


export {
    taskSelectors,
    taskReducer,
    taskActionsGroup,
    Task
}