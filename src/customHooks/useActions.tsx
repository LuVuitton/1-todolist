import {ActionCreatorsMapObject, bindActionCreators} from 'redux'
import {useMemo} from 'react'
import {useCustomThunkDispatch} from "../redux/store";

//СЮДА ВЫСЫПАЕМ ВСЕ ЧТО НУЖНО ЗАДИСПАТЧИТЬ, н
//что бы избавится от явного доставания диспатча в каждой компоненте, юзаем это, он д
// принимает обьект с АС или\и ТС и внутри сединяет кажды ТС\АС и диспатч и возвращет уже обьект склееных функций

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
