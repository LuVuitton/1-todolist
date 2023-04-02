//теперь в юз селекторе нам не нужно постоянно типизировать рутовый стейт, типизируем ток значение которое хотим получить
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {rootStateType} from "../redux/store";
export const useCustomSelector: TypedUseSelectorHook<rootStateType> = useSelector
//<rootStateType> передаем как аргумент в TypedUseSelectorHook