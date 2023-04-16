import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed' // бездействующий|загружается|успешно|неуспешно
export type AppErrorMessageType = string | null


export type AppStateType = typeof initialAppState

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






// export const appReducer = (state: GlobalStateType = initialAppState, actions: GeneralGlobalACType) => {
//     switch (actions.type) {
//         // case 'SET-STATUS':
//         //     return {...state, status: actions.payload.status}
//         // case 'SET-ERROR-MESSAGE':
//         //     return {...state, errorMessage: actions.payload.errorMessage}
//         case "SET-IS-INITIALIZED":
//             return {...state, isInitialized: actions.payload.value}
//         default:
//             return state
//     }
// }



