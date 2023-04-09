import {Dispatch} from "redux";
import {authAPI} from "../../DAL/AuthAPI";
import {GeneralAuthACType} from "../actionCreators/ActionCreators";
import {setGlobalStatusAC} from "./globalReducer";
import {ErrorResponseDataAPI, ResulAPICode} from "../../Types";
import {runDefaultCatch, setErrorTextDependingMessage} from "../../utilities/error-utilities";
import {AxiosError} from "axios";

export type AuthStateType = typeof initialState


const initialState = {
    isLoggedIn: false
}


export const authReducer = (state: AuthStateType = initialState, action: GeneralAuthACType) => {

    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.payload.logValue}

        default:
            return state
    }
}

export const setIsLoggedInAC = (logValue: boolean) => ({type: 'login/SET-IS-LOGGED-IN', payload: {logValue} as const})


export const logInTC = (email: string, password: string, rememberMe?: boolean, captcha?: boolean) =>
    (dispatch: Dispatch<GeneralAuthACType>) => {

        dispatch(setGlobalStatusAC("loading"))

        authAPI.login(email, password, rememberMe, captcha)
            .then(r => {
                if (r.resultCode === ResulAPICode.Ok) {
                    const userID = r.data.userId //перке пока не ясно
                    dispatch(setIsLoggedInAC(true))
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
                dispatch(setIsLoggedInAC(true))
                dispatch(setGlobalStatusAC("succeeded"))
            } else {
                setErrorTextDependingMessage(dispatch, r)
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
        })
}

export const logOutTC = ()=> (dispatch:Dispatch)=> {
    dispatch(setGlobalStatusAC("loading"))

    authAPI.logout()
        .then(r=> {
            if (r.resultCode === ResulAPICode.Ok) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setGlobalStatusAC("succeeded"))
            } else {
                setErrorTextDependingMessage(dispatch, r)
            }
        })
        .catch((err: AxiosError<ErrorResponseDataAPI>) => {
            runDefaultCatch(dispatch, err)
        })
}