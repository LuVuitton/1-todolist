import {authStateForTests} from "../StateForTest";
import {authActions, authReducer, AuthStateType} from "../../redux/reducers/authReducer";

let startState: AuthStateType;

beforeEach(() => {
    startState = authStateForTests
})


test('have to change key "isLoggedIn" to true', () => {

    const action = authActions.setIsLoggedInAC({logValue:true})
    const endState = authReducer(startState, action)

    expect(endState.isLoggedIn).toBe(true)
})

test('have to change key "isLoggedIn" to false', ()=> {

    const action = authActions.setIsLoggedInAC({logValue:false})
    const endState = authReducer(startState,action)

    expect(endState.isLoggedIn).toBe(false)
})

