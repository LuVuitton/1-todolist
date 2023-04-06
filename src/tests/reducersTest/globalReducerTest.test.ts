import {globalStateForTests} from "../StateForTest";
import {globalReducer, GlobalStateType, setErrorMessageAC, setGlobalStatusAC} from "../../redux/reducers/globalReducer";

let startState: GlobalStateType;

beforeEach(() => {
    startState = globalStateForTests
})


test('have to change status to loading', () => {


    const action = setGlobalStatusAC('loading')

    const endState = globalReducer(startState, action)

    expect(endState.status).toBe('loading')
    expect(endState.status).not.toEqual(startState.status)
})

test('have to change errorMessage to "New Error Message" ', () => {


    const action = setErrorMessageAC('New Error Message')

    const endState = globalReducer(startState, action)

    expect(endState.errorMessage).toBe('New Error Message')
    expect(endState.errorMessage).not.toEqual(startState.errorMessage)
})