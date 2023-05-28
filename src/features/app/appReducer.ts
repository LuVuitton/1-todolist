import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../../redux/store";
import { action } from "@storybook/addon-actions";

export type AppStateType = typeof initialAppState
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed' // бездействующий|загружается|успешно|неуспешно
export type AppErrorMessageType = string | null


const initialAppState = {
    appStatus: "idle" as StatusType,
    errorMessage: null as AppErrorMessageType,
    isInitialized: false,
    //параметр что дождется ответа на ME что бы картинка не прыгала с логина на листы, сетаем тру, потом отображаем загрузку
}

const slice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ appStatus: StatusType }>) {
            state.appStatus = action.payload.appStatus
        },
        setErrorMessage(state, action: PayloadAction<{ errorMessage: AppErrorMessageType }>) {
            state.errorMessage = action.payload.errorMessage
        },
        setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    },
    extraReducers: builder => {
        builder
            //в эдматчер экш попадает после каждого диспатча
            //первая функция(matcher), должна вернуть булево значение, если тру сработает вторая функция

            .addMatcher(
                (action) => {
                    //Когда асинхронное действие запускается (т.е., когда вызывается функция АС'), Redux Toolkit
                    // автоматически диспатчит экшн с типом "pending". Это происходит до выполнения самой асинхронной операции
                    // Когда асинхронная операция успешно завершается, Redux Toolkit автоматически диспатчит экшн
                    // с типом "fulfilled".
                    // Если во время выполнения операции происходит ошибка, Redux Toolkit диспатчит экшн с типом "rejected".
                    return action.type.endsWith('/pending')

                },
                (state: typeof initialAppState, action) => {
                    state.appStatus = 'loading'
                }
            )
            .addMatcher(

                (action) => {
                    return action.type.endsWith('/rejected')
                },
                (state, action) => {
                    state.appStatus = 'failed'
                    if (action.payload) {
                        state.errorMessage = action.payload.messages.length ? action.payload.messages[0] : 'some error occurred'

                    } else {
                        state.errorMessage = action.error.message ? action.error.message : 'some error occurred'
                    }
                    
                })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/fulfilled')
                },
                (state, action) => {
                    state.appStatus = 'idle'
                })

    }
})
export const appReducer = slice.reducer

export const appActions = slice.actions





