import {globalStateForTests} from "../StateForTest";
import {appActions, appReducer, AppStateType,} from "../../redux/reducers/appReducer";


let startState: AppStateType;

beforeEach(() => {
    startState = globalStateForTests
})


test('have to change status to loading', () => {

    const action = appActions.setAppStatus({appStatus:'loading'})
    const endState = appReducer(startState, action)

    expect(endState.appStatus).toBe('loading')
    expect(endState.appStatus).not.toEqual(startState.appStatus)
})


test('have to change errorMessage to "New Error Message" ', () => {

    const action = appActions.setErrorMessage({errorMessage:'New Error Message'})
    const endState = appReducer(startState, action)

    expect(endState.errorMessage).toBe('New Error Message')
    expect(endState.errorMessage).not.toEqual(startState.errorMessage)
})


test('have to change isInitialized to true', ()=> {

    const action = appActions.setIsInitialized({isInitialized:true})
    const endState = appReducer(startState,action)

    expect(endState.isInitialized).toBe(true)
})