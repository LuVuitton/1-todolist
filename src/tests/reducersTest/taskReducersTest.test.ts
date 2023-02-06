import {tasksStateForTest} from "../StateForTest";
import {mainACTaskType, TasksType} from "../../Types";
import {addArrTasksAC, addEditedTaskAC, switchCheckboxAC, taskReducer} from "../../reducers/taskReduser";

const startState = tasksStateForTest

test('should add new task to exact list', () => {

    const action: mainACTaskType = {type: 'ADD-TASK', payload: {inputValue: 'name for new task', toDoListId: 'listID2'}}

    const endState = taskReducer(startState, action)

    expect(endState['listID2'][0].taskValue).toBe('name for new task')
    expect(endState['listID1'][0].taskValue).toBe('HTML&CSS')
    expect(endState['listID2'].length).toBe(6)
    expect(endState['listID1'].length).toBe(5)
    expect(endState['listID2'].length === startState['listID2'].length).toBe(false)
})

test('should to remove the task from the list by id', () => {

    const action: mainACTaskType = {type: 'REMOVE-TASK', payload: {taskID: 'taskID4', toDoListId: 'listID2'}}

    const endState = taskReducer(startState, action)

    expect(endState['listID2'].length).toBe(4)
    expect(endState['listID1'].length).toBe(5)
    expect(endState['listID2'].length === startState['listID2'].length).toBe(false)
    expect(endState['listID2'][3].taskValue).toBe('piatoe')

})

test('should to switch checkbox in task by id', () => {

    const action = switchCheckboxAC('taskID2', false, 'listID1')

    const endState = taskReducer(startState, action)

    expect(endState['listID1'][1].checked).toBe(true)
    expect(endState['listID2'][1].checked).toBe(false)
    expect(endState['listID1'].length === startState['listID1'].length).toBe(true)

})

test('should to set a new name for the existing task', () => {

    const action = addEditedTaskAC('new name for task','listID2', 'taskID1' )

    const endState = taskReducer(startState, action)

    expect(endState['listID2'][0].taskValue).toBe('new name for task')
    expect(endState['listID2'].length).toBe(5)
    expect(endState['listID1'][0].taskValue).toBe('HTML&CSS')

})

test('should add new empty array for new list by list id', () => {

    const action = addArrTasksAC('newListID')

    const endState = taskReducer(startState, action)


    expect(endState['newListID'].length).toBe(0)
    expect(endState['listID1'].length === startState['listID1'].length).toBe(true)
    expect(endState['listID2'].length === startState['listID2'].length).toBe(true)
})

