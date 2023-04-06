
export type GlobalRequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' // бездействующий|загружается|успешно|неуспешно
export type GlobalErrorMessageType = string | null
export type GlobalStateType = {
    status: GlobalRequestStatusType
    errorMessage: GlobalErrorMessageType
}


const initialErrorState: GlobalStateType = {
    status: "idle",
    errorMessage: null
}


export const globalReducer = (state: GlobalStateType = initialErrorState, actions: AllGlobalACType) => {
    switch (actions.type) {
        case 'SET-STATUS': {
            return {...state, status: actions.payload.status}
        }
        case 'SET-ERROR-MESSAGE': {
            return {...state, errorMessage: actions.payload.errorMessage}
        }
        default:
            return state
    }
}


export type AllGlobalACType =
    | ReturnType<typeof setGlobalStatusAC>
    | ReturnType<typeof setErrorMessageAC>

export const setGlobalStatusAC = (status: GlobalRequestStatusType) =>
    ({type: 'SET-STATUS', payload: {status}} as const)
export const setErrorMessageAC = (errorMessage: GlobalErrorMessageType) =>
    ({type: 'SET-ERROR-MESSAGE', payload: {errorMessage}} as const)
