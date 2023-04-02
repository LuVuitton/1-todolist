import {tasksStateForTest} from "../StateForTest";
import { StatusesForTask} from "../../Types";
import {addEditedTaskAC, mainACTaskType, switchCheckboxAC} from "../../actionCreators/ActionCreators";
import {taskReducer} from "../../redux/reducers/taskReduser";

const startState = tasksStateForTest

test('should add new task to exact list', () => {

    const action: mainACTaskType = {type: 'ADD-TASK', payload: {inputValue: 'name for new task', toDoListId: 'listID2'}}

    const endState = taskReducer(startState, action)

    expect(endState['listID2'][0].title).toBe('name for new task')
    expect(endState['listID1'][0].title).toBe('HTML&CSS')
    expect(endState['listID2'][startState['listID2'].length]).toBeDefined()
    expect(endState['listID1'].length).toBe(startState['listID1'].length)
    expect(endState['listID2'].length === startState['listID2'].length).toBeFalsy()
})

test('should to remove the task from the list by id', () => {

    const action: mainACTaskType = {type: 'REMOVE-TASK', payload: {taskID: 'taskID4', toDoListId: 'listID2'}}

    const endState = taskReducer(startState, action)

    expect(endState[startState['listID2'].length]).toBeUndefined()
    expect(endState['listID1'].length).toBe(startState['listID1'].length)
    expect(endState['listID2'].length).not.toEqual(startState['listID2'].length)
    expect(endState['listID2'].every(e => e.id != 'taskID4')).toBeTruthy()
})

test('should to switch checkbox in task by id', () => {

    const action = switchCheckboxAC('taskID2', StatusesForTask.Completed, 'listID1')

    const endState = taskReducer(startState, action)

    expect(endState['listID1'][1].status).toBe(StatusesForTask.Completed)
    expect(endState['listID2'][1].status).toBe(StatusesForTask.New)
    expect(endState['listID1'].length).toEqual(startState['listID1'].length)
})

test('should to set a new name for the existing task', () => {

    const action = addEditedTaskAC('new name for task', 'listID2', 'taskID1')

    const endState = taskReducer(startState, action)

    expect(endState['listID2'][0].title).toBe('new name for task')
    expect(endState['listID1'][0].title).toBe('HTML&CSS')
})


