import {combineReducers} from 'redux'
import thunk, {ThunkDispatch} from 'redux-thunk';
import {listReducer} from "./reducers/listReducers";
import {taskReducer} from "./reducers/taskReduser";
import {useDispatch} from "react-redux";
import {GeneralACType} from "./actionCreators/ActionCreators";
import {globalReducer} from "./reducers/globalReducer";
import {authReducer} from "./reducers/authReducer";
import {configureStore} from '@reduxjs/toolkit';


const rootReducer = combineReducers({// сюда возврщается стейт из редьюсеров и на этот обьект(или ключи или шо) подписан юз селектор
    lists: listReducer,
    tasks: taskReducer,
    global: globalReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

// export type RootStateType = ReturnType<typeof rootReducer>
export type RootStateType = ReturnType<typeof store.getState>

// applyMiddleware сортирует функции и обьекты и если приходит фун, то он ее вызывает, при выхове помезает туда диспатч и гетСтейт

// export const store = createStore(rootReducer, applyMiddleware(thunk))


// кастомный хук для юзДиспатч, теперь он опять может принимать санки а не только объекты
export type DispatchThunkType = ThunkDispatch<RootStateType, any, GeneralACType>
export const useCustomThunkDispatch = () => useDispatch<DispatchThunkType>()



// @ts-ignore
window.store = store
