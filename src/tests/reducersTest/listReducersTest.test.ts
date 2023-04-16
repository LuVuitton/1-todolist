import {listStateForTest} from "../StateForTest";
import {
    listActions,
    listReducer,
    listsThunk
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
    const action = listsThunk.addListAndEmptyTasks.fulfilled({newList: newList}, 'requestID', newList.title )

    const endState = listReducer(startState, action)

    expect(endState.length > startState.length).toBeTruthy()
    expect(endState[0].title).toBe('new for new list')

})

test('should remove specific list by id', () => {

    const action = listsThunk.deleteAPIListTC.fulfilled({listID: 'listID1'},'requestID', 'listID1' )

    const endState = listReducer(startState, action)

    expect(endState.length).not.toEqual(startState.length)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('listID2')
    expect(endState.every(e => e.id != 'listID1')).toBeTruthy()
    expect(endState[2]).toBeUndefined()
})

test('should to set a new name for the existing list', () => {

    const action = listsThunk.updateListTitle.fulfilled({listID: 'listID1', title: 'new list name'}, 'requestID', {listID: 'listID1', title: 'new list name'})

    const endState = listReducer(startState, action)

    expect(endState.length).toEqual(startState.length)
    expect(endState[0].title).toBe('new list name')
    expect(endState[1].title).toBe('numbers')
})


test('should to change entity list status to loading', () => {

    const action = listActions.setListStatusAC({listID: 'listID1', listStatus: 'loading'})

    const endState = listReducer(startState, action)

    expect(endState[0].listStatus).toBe('loading')
    expect(endState[0].listStatus).not.toEqual(startState[0].listStatus)


})

