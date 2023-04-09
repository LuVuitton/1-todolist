import {authStateForTests} from "../StateForTest";
import {authReducer, AuthStateType, setIsLoggedInAC} from "../../redux/reducers/authReducer";

let startState: AuthStateType;

beforeEach(() => {
    startState = authStateForTests
})


test('have to change key "isLoggedIn" to true', () => {

    const action = setIsLoggedInAC(true)
    const endState = authReducer(startState, action)

    expect(endState.isLoggedIn).toBe(true)
})

test('have to change key "isLoggedIn" to false', ()=> {

    const action = setIsLoggedInAC(false)
    const endState = authReducer(startState,action)

    expect(endState.isLoggedIn).toBe(true)
})

