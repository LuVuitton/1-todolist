import {AnyAction, combineReducers} from 'redux'
import thunk, {ThunkDispatch} from 'redux-thunk';
import {listReducer} from "../features/list";
import {taskReducer} from "../features/task";
import {useDispatch} from "react-redux";
import {appReducer} from "../features/app";
import {authReducer} from "../features/auth";
import {configureStore} from '@reduxjs/toolkit';


const rootReducer = combineReducers({// сюда возврщается стейт из редьюсеров и на этот обьект(или ключи или шо) подписан юз селектор
    lists: listReducer,
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type RootStateType = ReturnType<typeof store.getState>




// кастомный хук для юзДиспатч, теперь он опять может принимать санки а не только объекты
// export type DispatchThunkType = ThunkDispatch<RootStateType, any, GeneralACType>
export type DispatchThunkType = ThunkDispatch<RootStateType, any, AnyAction>
export const useCustomThunkDispatch = () => useDispatch<DispatchThunkType>()



// @ts-ignore
window.store = store






// applyMiddleware сортирует функции и обьекты и если приходит фун, то он ее вызывает, при выхове помещает туда диспатч и гетСтейт
// export type RootStateType = ReturnType<typeof rootReducer>
// export const store = createStore(rootReducer, applyMiddleware(thunk))
