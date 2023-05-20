import {ActionCreatorsMapObject, bindActionCreators} from 'redux'
import {useMemo} from 'react'
import {useCustomThunkDispatch} from "../redux/store";
//
// СЮДА ВЫСЫПАЕМ ВСЕ ЧТО НУЖНО ЗАДИСПАТЧИТЬ, н
// что бы избавится от явного доставания диспатча в каждой компоненте, юзаем это, он д
// принимает обьект с АС или\и ТС и внутри сединяет кажды ТС\АС и диспатч и возвращет уже обьект склееных функций
//
// теперь вместо того что бы писать диспатч(Экшн(пармс))
//
// пишем
//
// обьектКоторыйВернулБайнд.Экшн(парамс)
// а диспатч происходит под капотом


export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useCustomThunkDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}
///////////////////////////////

//ниже вариант юзЭкшен который вернет промис
// НО в экшн при диспатче обязательно что то передать, даже если он ничего не должен принимать,
// пока это не обязательно пусть полежит прост


// import { useMemo } from 'react'
// import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
// import { useCustomThunkDispatch } from './../redux/store';
//
// export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
//     const dispatch = useCustomThunkDispatch()
//
//     return useMemo(
//         () => bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch),
//         [actions, dispatch]
//     )
// }
//
// // Types
// type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true
// type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>
// type ReplaceReturnType<T, TNewReturn> = T extends (a: infer A) => infer R
//     ? IsValidArg<A> extends true
//         ? (a: A) => TNewReturn
//         : () => TNewReturn
//     : never
// type RemapActionCreators<T extends ActionCreatorsMapObject> = {
//     [K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
// }
