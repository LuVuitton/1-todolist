import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type GlobalRequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' // бездействующий|загружается|успешно|неуспешно
export type GlobalErrorMessageType = string | null


export type GlobalStateType = typeof initialGlobalState

const initialGlobalState = {
    globalStatus: "idle" as GlobalRequestStatusType,
    errorMessage: null as GlobalErrorMessageType,
    isInitialized: false,
    //параметр что дождется ответа на ME что бы картинка не прыгала с логина на листы, сетаем тру, потом отображаем загрузку
}

const slice = createSlice({
    name:'global',
    initialState:initialGlobalState,
    reducers:{
        setGlobalStatusAC(state, action:PayloadAction<{globalStatus: GlobalRequestStatusType}>){
            state.globalStatus = action.payload.globalStatus
        },
        setErrorMessageAC(state, action:PayloadAction<{errorMessage: GlobalErrorMessageType}>){
            state.errorMessage = action.payload.errorMessage
        },
        setIsInitializedAC(state, action:PayloadAction<{isInitialized:boolean}>){
            state.isInitialized =action.payload.isInitialized
        }
    }
})
export const globalReducer = slice.reducer
export const {setGlobalStatusAC,setErrorMessageAC,setIsInitializedAC} = slice.actions






// export const globalReducer = (state: GlobalStateType = initialGlobalState, actions: GeneralGlobalACType) => {
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



