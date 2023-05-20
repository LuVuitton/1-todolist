import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type AppStateType = typeof initialAppState
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed' // бездействующий|загружается|успешно|неуспешно
export type AppErrorMessageType = string | null



const initialAppState = {
    appStatus: "idle" as StatusType,
    errorMessage: null as AppErrorMessageType,
    isInitialized: false,
    //параметр что дождется ответа на ME что бы картинка не прыгала с логина на листы, сетаем тру, потом отображаем загрузку
}

const slice = createSlice({
    name:'app',
    initialState:initialAppState,
    reducers:{
        setAppStatus(state, action:PayloadAction<{appStatus: StatusType}>){
            state.appStatus = action.payload.appStatus
        },
        setErrorMessage(state, action:PayloadAction<{errorMessage: AppErrorMessageType}>){
            state.errorMessage = action.payload.errorMessage
        },
        setIsInitialized(state, action:PayloadAction<{isInitialized:boolean}>){
            state.isInitialized =action.payload.isInitialized
        }
    }
})
export const appReducer = slice.reducer

export const appActions = slice.actions





