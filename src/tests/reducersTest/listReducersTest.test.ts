import {listStateForTest} from "../StateForTest";
import {listReducer} from "../../reducers/listReducers";
import {mainACListType, ToDoListType} from "../../Types";

const startState = listStateForTest

test('should add new list to array of toDoLists', () => {

    const action: mainACListType = {
        type: 'ADD-LIST', payload: {
            inputValue: 'new for new list', dispatchTasks: () => {
            }
        }
    }

    const endState:ToDoListType[] = listReducer(startState, action)

    expect(endState.length > startState.length).toBe(true)
    expect(endState[0].titleList).toBe('new for new list')

})

test('should remove specific list by id', () => {

    const action: mainACListType = {type: 'REMOVE-LIST', payload: {toDoListId: 'listID1'}}

    const endState:ToDoListType[] = listReducer(startState, action)

    expect(endState.length === startState.length).toBe(false)
    expect(endState.length).toBe(1)
    expect(endState[0].toDoListID).toBe('listID2')
})

test('should to set a new name for the existing list', () => {

    const action: mainACListType = {
        type: 'ADD-EDITED-LIST-TITLE',
        payload: {value: 'new list name', toDoListID: 'listID1'}
    }

    const endState:ToDoListType[] = listReducer(startState, action)

    expect(endState.length===startState.length).toBe(true)
    expect(endState[0].titleList).toBe('new list name')
    expect(endState[1].titleList).toBe('numbers')
})

test('should to change filter value in list',()=> {

    const action:mainACListType = {type: 'CHANGE-FILTER-LIST', payload: {value: 'active', toDoListId: 'listID2'}}

    const endState:ToDoListType[] = listReducer(startState, action)

    expect(endState[1].filter).toBe('active')
    expect(endState[0].filter).toBe('all')
})


