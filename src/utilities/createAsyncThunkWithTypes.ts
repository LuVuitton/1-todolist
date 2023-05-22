import {createAsyncThunk} from "@reduxjs/toolkit";
import {DispatchThunkType, RootStateType} from "../redux/store";
import {GeneralResponseType} from "../Types";

// как выглядит типизация обычной createAsyncThunk
// <то что санка возвращает, то что приходит как пейлоад, то что сидит в параметре санки как thunkAPI(то где берем диспачт и ошибку и т.д)>

// для того что бы не типизировать каждый раз третий параметр используем эту функцию, так предлагали в документации

// и теперь вместо createAsyncThunk используем ее

export const createAsyncThunkWithTypes = createAsyncThunk.withTypes<{
    state: RootStateType,
    dispatch: DispatchThunkType,
    rejectValue: null | GeneralResponseType, //написал нулл потому что в заглушке ошибки передаем null
}>()