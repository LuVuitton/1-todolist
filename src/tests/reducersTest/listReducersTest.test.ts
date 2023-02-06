import {listStateForTest} from "../StateForTest";
import {
    addEditedListTitleAC,
    addListAC,
    changeFilterListAC,
    listReducer,
    removeListAC
} from "../../reducers/listReducers";
import {mainACListType} from "../../Types";
import {addEditedTaskAC} from "../../reducers/taskReduser";

const startState = listStateForTest

test('should add new list to array of toDoLists', () => {

    const action =  addListAC('new for new list',()=>{})


    const endState = listReducer(startState, action)

    expect(endState.length > startState.length).toBe(true)
    expect(endState[0].titleList).toBe('new for new list')

})

test('should remove specific list by id', () => {

    const action = removeListAC('listID1')

    const endState = listReducer(startState, action)

    expect(endState.length === startState.length).toBe(false)
    expect(endState.length).toBe(1)
    expect(endState[0].toDoListID).toBe('listID2')
})

test('should to set a new name for the existing list', () => {

    const action = addEditedListTitleAC('new list name','listID1')

    const endState = listReducer(startState, action)

    expect(endState.length===startState.length).toBe(true)
    expect(endState[0].titleList).toBe('new list name')
    expect(endState[1].titleList).toBe('numbers')
})

test('should to change filter value in list',()=> {

    const action = changeFilterListAC('active','listID2' )

    const endState = listReducer(startState, action)

    expect(endState[1].filter).toBe('active')
    expect(endState[0].filter).toBe('all')
})


