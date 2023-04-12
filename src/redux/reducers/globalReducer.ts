import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type GlobalRequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' // бездействующий|загружается|успешно|неуспешно
export type GlobalErrorMessageType = string | null


export type GlobalStateType = {
    status: GlobalRequestStatusType,
    errorMessage: GlobalErrorMessageType,
    isInitialized: boolean,
}

const initialGlobalState: GlobalStateType = {
    status: "idle",
    errorMessage: null,
    isInitialized: false,
    //параметр что дождется ответа на ME что бы картинка не прыгала с логина на листы, сетаем тру, потом отображаем загрузку
}

const slice = createSlice({
    name:'global',
    initialState:initialGlobalState,
    reducers:{
        setGlobalStatusAC(state: GlobalStateType, action:PayloadAction<{status: GlobalRequestStatusType}>){
            state.status = action.payload.status
        },
        setErrorMessageAC(state:GlobalStateType, action:PayloadAction<{errorMessage: GlobalErrorMessageType}>){
            state.errorMessage = action.payload.errorMessage
        },
        setIsInitializedAC(state:GlobalStateType, action:PayloadAction<{value:boolean}>){
            state.isInitialized =action.payload.value
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



