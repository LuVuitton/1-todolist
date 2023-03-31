import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import {listReducer} from "./reducers/listReducers";
import {taskReducer} from "./reducers/taskReduser";


const rootReducer = combineReducers({
    lists: listReducer,
    tasks: taskReducer
})

export type rootStateType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store