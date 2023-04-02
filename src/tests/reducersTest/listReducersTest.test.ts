import {listStateForTest} from "../StateForTest";
import {
    addEditedListTitleAC,
    removeListAC
} from "../../actionCreators/ActionCreators";
import {listReducer} from "../../redux/reducers/listReducers";


//beforeEach(()=>{}) сработает перед началом каждого теста

const startState = listStateForTest

//
// test('should add new list to array of toDoLists', () => {
//
//     const action =  addListCreateEmptyTasksAC('new for new list', 'newListID')
//
//     const endState = listReducer(startState, action)
//
//     expect(endState.length > startState.length).toBeTruthy()
//     expect(endState[0].title).toBe('new for new list')
//     expect(endState[2]).toBeDefined()
// })

test('should remove specific list by id', () => {

    const action = removeListAC('listID1')

    const endState = listReducer(startState, action)

    expect(endState.length).not.toEqual(startState.length)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('listID2')
    expect(endState.every(e=>e.id != 'listID1' )).toBeTruthy()
    expect(endState[2]).toBeUndefined()
})

test('should to set a new name for the existing list', () => {

    const action = addEditedListTitleAC('new list name','listID1')

    const endState = listReducer(startState, action)

    expect(endState.length).toEqual(startState.length)
    expect(endState[0].title).toBe('new list name')
    expect(endState[1].title).toBe('numbers')
})


