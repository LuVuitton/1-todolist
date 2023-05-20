import {runDefaultCatch, setServerError} from "../../utilities/error-utilities";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAsyncThunkWithTypes} from "../../utilities";
import {listActions} from "../list/listReducers";
import {authAPI, AuthDataType} from "../../DAL/AuthAPI";
import {ResulAPICode} from "../../Types";
import {appActionsGroup} from "../app";

const login = createAsyncThunkWithTypes<void, { data: AuthDataType }>('auth/logInTC', async (arg, thunkAPI) => {
    const {dispatch} = thunkAPI
    dispatch(appActionsGroup.setAppStatus({appStatus: 'loading'}))
    try {
        const r = await authAPI.login(arg.data)
        if (r.resultCode === ResulAPICode.Ok) {
            dispatch(appActionsGroup.setAppStatus({appStatus: 'succeeded'}))
            dispatch(authActions.setIsLoggedInAC({logValue: true}))
        } else {
            setServerError(dispatch, r)
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
    }
})

const checkMe = createAsyncThunkWithTypes<void>('auth/checkMe', async (arg, thunkAPI) => {
    const {dispatch} = thunkAPI
    dispatch(appActionsGroup.setAppStatus({appStatus: 'loading'}))
    try {
        const r = await authAPI.checkMe()
        if (r.resultCode === ResulAPICode.Ok) {
            dispatch(authActions.setIsLoggedInAC({logValue: true}))
            dispatch(appActionsGroup.setAppStatus({appStatus: 'succeeded'}))
        } else {
            setServerError(dispatch, r, false)
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
    } finally {
        dispatch(appActionsGroup.setIsInitialized({isInitialized: true}))
    }
})

const logout = createAsyncThunkWithTypes<void>('auth/logout', async (arg, thunkAPI) => {
    const {dispatch} = thunkAPI
    dispatch(appActionsGroup.setAppStatus({appStatus: 'loading'}))
    try {
        const r = await authAPI.logout()
        if (r.resultCode === ResulAPICode.Ok) {
            dispatch(authActions.setIsLoggedInAC({logValue: false}))
            dispatch(appActionsGroup.setAppStatus({appStatus: 'succeeded'}))
            dispatch(listActions.clearAllStateAC())
        } else {
            setServerError(dispatch, r)
        }
    } catch (err) {
        runDefaultCatch(dispatch, err)
    }
})


export type AuthStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState, //❗Если будут писаться тесты на slice или понадобится типизация,выносим initialState наверх
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ logValue: boolean }>) {
            state.isLoggedIn = action.payload.logValue
        }
    }
})
export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunk = {login, logout,checkMe}


// export const checkLoginTC = () => (dispatch: Dispatch) => {
//     dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
//     authAPI.checkMe()
//         .then(r => {
//             if (r.resultCode === ResulAPICode.Ok) {
//                 dispatch(authActions.setIsLoggedInAC({logValue: true}))
//                 dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
//             } else {
//                 setErrorTextDependingMessage(dispatch, r)
//             }
//         })
//         .catch((err: AxiosError<ErrorResponseDataAPI>) => {
//             runDefaultCatch(dispatch, err)
//         })
//         .finally(() => {
//             dispatch(setIsInitializedAC({isInitialized: true}))
//         })
// }
// export const logOutTC = () => (dispatch: Dispatch) => {
//     dispatch(setGlobalStatusAC({globalStatus: 'loading'}))
//
//     authAPI.logout()
//         .then(r => {
//             if (r.resultCode === ResulAPICode.Ok) {
//                 dispatch(authActions.setIsLoggedInAC({logValue: false}))
//                 dispatch(setGlobalStatusAC({globalStatus: 'succeeded'}))
//                 dispatch(listActions.clearAllStateAC())
//             } else {
//                 setErrorTextDependingMessage(dispatch, r)
//             }
//         })
//         .catch((err: AxiosError<ErrorResponseDataAPI>) => {
//             runDefaultCatch(dispatch, err)
//         })
// }
//
// export const authReducer = (state: AuthStateType = initialState, action: GeneralAuthACType) => {
//     switch (action.type) {
//         case "login/SET-IS-LOGGED-IN":
//             return {...state, isLoggedIn: action.payload.logValue}
//         default:
//             return state
//     }
// }
// export const setIsLoggedInAC = (logValue: boolean) => ({type: 'login/SET-IS-LOGGED-IN', payload: {logValue} as const})
