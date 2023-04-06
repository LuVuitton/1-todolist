import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk, {ThunkDispatch} from 'redux-thunk';
import {listReducer} from "./reducers/listReducers";
import {taskReducer} from "./reducers/taskReduser";
import { useDispatch} from "react-redux";
import {GeneralACType} from "./actionCreators/ActionCreators";
import {globalReducer} from "./reducers/globalReducer";


const rootReducer = combineReducers({
    lists: listReducer, // сюда возврщается стейт из редьюсеров и на этот обьект(или ключи или шо) подписан юз селектор
    tasks: taskReducer,
    global: globalReducer
})

export type RootStateType = ReturnType<typeof rootReducer>

// applyMiddleware сортирует функции и обьекты и если приходит фун, то он ее вызывает, при выхове помезает туда диспатч и гетСтейт
export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store






// кастомный хук для юзДиспатч, теперь он опять может принимать санки а не только объекты
export type DispatchThunkType = ThunkDispatch<RootStateType, any, GeneralACType>
export const useCustomThunkDispatch = () => useDispatch<DispatchThunkType>()


