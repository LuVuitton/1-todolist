//теперь в юз селекторе нам не нужно постоянно типизировать рутовый стейт, типизируем ток значение которое хотим получить
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootStateType} from "../redux/store";
export const useCustomSelector: TypedUseSelectorHook<RootStateType> = useSelector
//<rootStateType> передаем как аргумент в TypedUseSelectorHook