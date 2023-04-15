import {setErrorMessageAC, setGlobalStatusAC} from "../redux/reducers/globalReducer";
import {Dispatch} from "redux";
import {ErrorResponseDataAPI, GeneralResponseType} from "../Types";
import axios, {AxiosError} from "axios";




//с бэка придет массив строк, ошибок, но он может быть пустой, в этом случае сетаем свой текст
// в конце засетал глобальный статус на фейлед потому как везде повторялось
//дженерик <D> перед скобками показывает на то что в момент вызова эта функция собирается
// перехватить тип который в нее приходит и заменить им все D,
// он возьмет r и захватит его data: во время вызова, а после подствит тип(который был в r.data во время вызова)
// в функцию
//в общем мы явно указываем на то что D внутри GeneralResponseType будет динамическим
//<D> - это не тип входящего обьекта!
export const setErrorTextDependingMessage = <D>(dispatch: Dispatch, r:GeneralResponseType<D>):void => {
    if (r.messages.length) { // проверяем есть ли какое то описание ошибки или массив пустой
        dispatch(setErrorMessageAC({errorMessage:r.messages[0]})) //ошибки находятся в массиве строк[]
    } else {
        dispatch(setErrorMessageAC({errorMessage:'some error has occurred'})) // если масс пустой в текст ошибки сетаем это
    }
    dispatch(setGlobalStatusAC({globalStatus:'failed'}))
}


//так как трай кетч нам может вернуть ошибку связаную не только с аксиосом но и просто с нативным кодом,
//мы должны обработать и ее перед логикой
export const runDefaultCatch = (dispatch: Dispatch, err: unknown ) => {
    const error = err as Error | AxiosError<ErrorResponseDataAPI>
    if (axios.isAxiosError(error)) {
    const errMessage = error.message?  error.message: 'some error has occurred'
        dispatch(setErrorMessageAC({errorMessage: errMessage}))
    } else {
        dispatch(setErrorMessageAC({errorMessage: `Native Error ${error.message}`}))
    }
    dispatch(setGlobalStatusAC({globalStatus: 'failed'}))
}




