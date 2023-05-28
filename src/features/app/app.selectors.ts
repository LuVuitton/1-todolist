import {RootStateType} from "../../redux/store";
//просто вынесли колбэек из юз селектора сюда что бы рефакторить в одном месте а не на каждом селекторе
export const selectAppStatus = (state:RootStateType) => state.app.appStatus
export const selectIsInitialized = (state:RootStateType) => state.app.isInitialized
export const selectErrorMessage = (state:RootStateType) => state.app.errorMessage
