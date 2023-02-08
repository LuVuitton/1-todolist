import {combineReducers, createStore} from 'redux'
import {listReducer} from "./reducers/listReducers";
import {taskReducer} from "./reducers/taskReduser";


const rootReducer = combineReducers({
    lists: listReducer,
    tasks: taskReducer
})

export type rootStateType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer)

// @ts-ignore
window.store = store