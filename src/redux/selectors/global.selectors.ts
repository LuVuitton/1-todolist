import {RootStateType} from "../store";
//просто вынесли колбэек из юз селектора сюда что бы рефакторить в одном месте а не на каждом селекторе
export const selectGlobalEntityStatus = (state:RootStateType) => state.global.globalStatus
export const selectIsInitialized = (state:RootStateType) => state.global.isInitialized
export const selectErrorMessage = (state:RootStateType) => state.global.errorMessage
