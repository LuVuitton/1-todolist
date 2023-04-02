import {tasksStateForTest} from "../StateForTest";
import { checkStatus} from "../../Types";
import {
    addEditedTaskAC, addTaskAC, mainACTaskType,
    switchCheckboxAC
} from "../../redux/actionCreators/ActionCreators";
import {taskReducer} from "../../redux/reducers/taskReduser";

const startState = tasksStateForTest


test('should to add new task to List', () => {
    const action: mainACTaskType = addTaskAC({
        id: 'taskID5',
        status: checkStatus.New,
        title: 'new task',
        todoListId: 'listID2',
        order: 1,
        addedDate: '',
        deadline: '',
        description: 'to learn',
        priority: 1,
        startDate: '',
    })

    const endState = taskReducer(startState, action)

    expect(endState['listID2'].length>startState['listID2'].length).toBeTruthy()
})


test('should to remove the task from the list by id', () => {

    const action: mainACTaskType = {type: 'REMOVE-TASK', payload: {taskID: 'taskID4', listID: 'listID2'}}

    const endState = taskReducer(startState, action)

    expect(endState[startState['listID2'].length]).toBeUndefined()
    expect(endState['listID1'].length).toBe(startState['listID1'].length)
    expect(endState['listID2'].length).not.toEqual(startState['listID2'].length)
    expect(endState['listID2'].every(e => e.id != 'taskID4')).toBeTruthy()
})



test('should to switch checkbox in task by id', () => {

    const action = switchCheckboxAC('taskID2', checkStatus.Completed, 'listID1')

    const endState = taskReducer(startState, action)

    expect(endState['listID1'][1].status).toBe(checkStatus.Completed)
    expect(endState['listID2'][1].status).toBe(checkStatus.New)
    expect(endState['listID1'].length).toEqual(startState['listID1'].length)
})

test('should to set a new name for the existing task', () => {

    const action = addEditedTaskAC('new name for task', 'listID2', 'taskID1')

    const endState = taskReducer(startState, action)

    expect(endState['listID2'][0].title).toBe('new name for task')
    expect(endState['listID1'][0].title).toBe('HTML&CSS')
})


