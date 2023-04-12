import {globalStateForTests} from "../StateForTest";
import {
    globalReducer,
    GlobalStateType,
    setErrorMessageAC,
    setGlobalStatusAC,
    setIsInitializedAC
} from "../../redux/reducers/globalReducer";

let startState: GlobalStateType;

beforeEach(() => {
    startState = globalStateForTests
})


test('have to change status to loading', () => {

    const action = setGlobalStatusAC({globalStatus:'loading'})
    const endState = globalReducer(startState, action)

    expect(endState.entityStatus).toBe('loading')
    expect(endState.entityStatus).not.toEqual(startState.entityStatus)
})


test('have to change errorMessage to "New Error Message" ', () => {

    const action = setErrorMessageAC({errorMessage:'New Error Message'})
    const endState = globalReducer(startState, action)

    expect(endState.errorMessage).toBe('New Error Message')
    expect(endState.errorMessage).not.toEqual(startState.errorMessage)
})


test('have to change isInitialized to true', ()=> {

    const action = setIsInitializedAC({isInitialized:true})
    const endState = globalReducer(startState,action)

    expect(endState.isInitialized).toBe(true)
})