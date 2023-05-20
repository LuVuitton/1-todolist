import {Dispatch} from "redux";
import {ErrorResponseDataAPI, GeneralResponseType} from "../Types";
import axios, {AxiosError} from "axios";
import {appActionsGroup} from "../features/app";


//с бэка придет массив строк, ошибок, но он может быть пустой, в этом случае сетаем свой текст
// в конце засетал глобальный статус на фейлед потому как везде повторялось
//дженерик <D> перед скобками показывает на то что в момент вызова эта функция собирается
// перехватить тип который в нее приходит и заменить им все D,
// он возьмет r и захватит его data: во время вызова, а после подствит тип(который был в r.data во время вызова)
// в функцию
//в общем мы явно указываем на то что D внутри GeneralResponseType будет динамическим
//<D> - это не тип входящего обьекта!
/**
 * ТА ТЫ ШО
 * @param dispatch переписать коменты под эту штуку
 * @param r 2
 * @param showError 3
 */
export const setServerError = <D>(dispatch: Dispatch, r: GeneralResponseType<D>, showError: boolean = true): void => {
    if (showError) {
        dispatch(appActionsGroup.setErrorMessage(r.messages.length
            ? {errorMessage: r.messages[0]}
            : {errorMessage: 'some error has occurred'}))
        dispatch(appActionsGroup.setAppStatus({appStatus: 'failed'}))
    }
}


//так как трай кетч нам может вернуть ошибку связаную не только с аксиосом но и просто с нативным кодом,
//мы должны обработать и ее перед логикой
export const runDefaultCatch = (dispatch: Dispatch, err: unknown) => {
    const error = err as Error | AxiosError<ErrorResponseDataAPI>
    if (axios.isAxiosError(error)) {
        const errMessage = error.message ? error.message : 'some error has occurred'
        dispatch(appActionsGroup.setErrorMessage({errorMessage: errMessage}))
    } else {
        dispatch(appActionsGroup.setErrorMessage({errorMessage: `Native Error ${error.message}`}))
    }
    dispatch(appActionsGroup.setAppStatus({appStatus: 'failed'}))
}




