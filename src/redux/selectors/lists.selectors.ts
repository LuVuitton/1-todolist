import {RootStateType} from "../store";
//просто вынесли колбэек из юз селектора сюда что бы рефакторить в одном месте а не на каждом селекторе

export const selectLists = (state:RootStateType) => state.lists
