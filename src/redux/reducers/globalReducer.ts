import {GeneralGlobalACType} from "../actionCreators/ActionCreators";

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
    //параметр который нужен что бы картинка не прыгала с логина на листы, сетаем тру, потом отображаем загрузку
}


export const globalReducer = (state: GlobalStateType = initialGlobalState, actions: GeneralGlobalACType) => {
    switch (actions.type) {
        case 'SET-STATUS':
            return {...state, status: actions.payload.status}
        case 'SET-ERROR-MESSAGE':
            return {...state, errorMessage: actions.payload.errorMessage}
        case "SET-IS-INITIALIZED":
            return {...state, isInitialized: actions.payload.value}
        default:
            return state
    }
}


export const setGlobalStatusAC = (status: GlobalRequestStatusType) =>
    ({type: 'SET-STATUS', payload: {status}} as const)
export const setErrorMessageAC = (errorMessage: GlobalErrorMessageType) =>
    ({type: 'SET-ERROR-MESSAGE', payload: {errorMessage}} as const)
export const setIsInitializedAC = (value:boolean) =>
    ({type: 'SET-IS-INITIALIZED', payload: {value}} as const)


