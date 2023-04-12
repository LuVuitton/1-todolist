import {listStateForTest} from "../StateForTest";
import {
    listReducer,
    addEditedListTitleAC,
    removeListAC,
    setEntityListStatusAC,
    addListCreateEmptyTasksAC
} from "../../redux/reducers/listReducers";
import {IncompleteListAPIType} from "../../Types";


//beforeEach(()=>{}) сработает перед началом каждого теста

const startState = listStateForTest


test('should add new list to array of toDoLists', () => {

    const newList: IncompleteListAPIType = {
        addedDate: '',
        order: 1,
        id: 'newListId',
        title: 'new for new list'
    }
    //на сервер постим
    const action = addListCreateEmptyTasksAC({newList:newList})

    const endState = listReducer(startState, action)

    expect(endState.length > startState.length).toBeTruthy()
    expect(endState[0].title).toBe('new for new list')

})

test('should remove specific list by id', () => {

    const action = removeListAC({listID: 'listID1'})

    const endState = listReducer(startState, action)

    expect(endState.length).not.toEqual(startState.length)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('listID2')
    expect(endState.every(e => e.id != 'listID1')).toBeTruthy()
    expect(endState[2]).toBeUndefined()
})

test('should to set a new name for the existing list', () => {

    const action = addEditedListTitleAC({listID: 'listID1', title: 'new list name'})

    const endState = listReducer(startState, action)

    expect(endState.length).toEqual(startState.length)
    expect(endState[0].title).toBe('new list name')
    expect(endState[1].title).toBe('numbers')
})


test('should to change entity list status to loading', () => {

    const action = setEntityListStatusAC({listID:'listID1', entityStatus:'loading'})

    const endState = listReducer(startState, action)

    expect(endState[0].entityStatus).toBe('loading')
    expect(endState[0].entityStatus).not.toEqual(startState[0].entityStatus)


})

