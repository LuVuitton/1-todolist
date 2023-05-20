import {tasksStateForTest} from "../../tests/stateForTest";
import {CheckStatus} from "../../Types";
import {taskActions, taskReducer, taskThunk} from "./taskReduser";

const startState = tasksStateForTest


test('should to add new task to List', () => {
    const action = taskThunk.addTask.fulfilled({
        newTask:{
            id: 'taskID5',
            status: CheckStatus.New,
            title: 'new task',
            todoListId: 'listID2',
            order: 1,
            addedDate: '',
            deadline: '',
            description: 'to learn',
            priority: 1,
            startDate: '',}
    },'requestID', {listID:'listID2',title:'NEW TASK'} )

    const endState = taskReducer(startState, action)

    expect(endState['listID2'].length > startState['listID2'].length).toBeTruthy()
})


test('should to remove the task from the list by id', () => {

    const action = taskThunk.removeTask.fulfilled({taskID: 'taskID4', listID: 'listID2'}, 'requestID', {taskID: 'taskID4', listID: 'listID2'})

    const endState = taskReducer(startState, action)

    expect(endState[startState['listID2'].length]).toBeUndefined()
    expect(endState['listID1'].length).toBe(startState['listID1'].length)
    expect(endState['listID2'].length).not.toEqual(startState['listID2'].length)
    expect(endState['listID2'].every(e => e.id != 'taskID4')).toBeTruthy()
})


test('should to switch checkbox in task by id', () => {

    const action = taskThunk.switchTaskCheck.fulfilled({listID:'listID1', taskID:'taskID2', check:CheckStatus.Completed}, 'requestID', {listID:'listID1', taskID:'taskID2', check:CheckStatus.Completed})

    const endState = taskReducer(startState, action)

    expect(endState['listID1'][1].status).toBe(CheckStatus.Completed)
    expect(endState['listID2'][1].status).toBe(CheckStatus.New)
    expect(endState['listID1'].length).toEqual(startState['listID1'].length)
})

test('should to set a new name for the existing task', () => {

    const action = taskThunk.updateTask.fulfilled({taskID:'taskID1', listID:'listID2',title:'new name for task' }, 'requestID', {taskID:'taskID1', listID:'listID2',title:'new name for task' })

    const endState = taskReducer(startState, action)

    expect(endState['listID2'][0].title).toBe('new name for task')
    expect(endState['listID1'][0].title).toBe('HTML&CSS')
})

test('should to change entity task status to false', () => {

    const action = taskActions.setTaskStatusAC({taskID: 'taskID1', listID:'listID1', taskIsLoading:false})

    const endState = taskReducer(startState, action)

    expect(endState['listID1'][0].taskIsLoading).toBe(false)
    expect(endState['listID1'][0].taskIsLoading).not.toEqual(startState['listID1'][0].taskIsLoading)


})
