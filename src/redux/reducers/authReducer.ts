import {GeneralAuthACType} from "../actionCreators/ActionCreators";
import {setGlobalStatusAC, setIsInitializedAC} from "./globalReducer";
import {runDefaultCatch, setErrorTextDependingMessage} from "../../utilities/error-utilities";
import {ErrorResponseDataAPI, ResulAPICode} from "../../Types";
import {authAPI, AuthDataType} from "../../DAL/AuthAPI";
import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearAllStateAC} from "./listReducers";

export type AuthStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState, //❗Если будут писаться тесты на slice или понадобится типизация,выносим initialState наверх
    reducers: {
        setIsLoggedInAC(state: AuthStateType, action: PayloadAction<{ logValue: boolean }>) {
            state.isLoggedIn = action.payload.logValue
        }
    }
})
export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// export const authActions = slice.actions //или так


// export const authReducer = (state: AuthStateType = initialState, action: GeneralAuthACType) => {
//     switch (action.type) {
//         case "login/SET-IS-LOGGED-IN":
//             return {...state, isLoggedIn: action.payload.logValue}
//         default:
//             return state
//     }
// }
// export const setIsLoggedInAC = (logValue: boolean) => ({type: 'login/SET-IS-LOGGED-IN', payload: {logValue} as const})


export const logInTC = (data: AuthDataType) =>
    (dispatch: Dispatch<GeneralAuthACType>) => {

        dispatch(setGlobalStatusAC("loading"))

        authAPI.login(data)
            .then(r => {
                if (r.resultCode === ResulAPICode.Ok) {
                    const userID = r.data.userId //перке пока не ясно
                    dispatch(setIsLoggedInAC({logValue: true}))
                    dispatch(setGlobalStatusAC("succeeded"))
                } else {
                    setErrorTextDependingMessage(dispatch, r)
                }
            })
            .catch((err: AxiosError<ErrorResponseDataAPI>) => {
                runDefaultCatch(dispatch, err)
            })
    }


export const checkLoginTC = () => (dispatch: Dispatch<GeneralAuthACType>) => {
    dispatch(setGlobalStatusAC("loading"))
    authAPI.checkLogin()
        .then(r => {
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(setIsLoggedInAC({logValue: true}))
                dispatch(setGlobalStatusAC("succeeded"))
            } else {
                setErrorTextDependingMessage(dispatch, r)
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setGlobalStatusAC("loading"))

    authAPI.logout()
        .then(r => {
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(setIsLoggedInAC({logValue: false}))
                dispatch(setGlobalStatusAC("succeeded"))
                dispatch(clearAllStateAC())
            } else {
                setErrorTextDependingMessage(dispatch, r)
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
        })
}