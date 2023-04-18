import {InputAdd} from "./InputAdd";
import React, {useCallback, useEffect} from "react";
import {useCustomThunkDispatch} from "../redux/store";
import {useCustomSelector} from "../customHooks/CustomHooks";
import {listsThunk} from "../redux/reducers/listReducers";
import {ToDoList} from "./ToDoList";
import {Navigate} from "react-router-dom";
import {selectLists} from "../redux/selectors/lists.selectors";
import {selectIsLoading} from "../redux/selectors/auth.selectors";
import {authThunk} from "../redux/reducers/authReducer";


export const MainContainer = () => {

    // описание кастомного диспатча в сторе
    const dispatch = useCustomThunkDispatch()
    // описание кастомного селектора в кастомных хуках
    const toDoLists = useCustomSelector(selectLists)
    const isLoggedIn = useCustomSelector(selectIsLoading)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(listsThunk.getListTC())
        }
    }, [])


    const addList = useCallback((inputValue: string) => {
        dispatch(listsThunk.addListAndEmptyTasks(inputValue))
    }, []) //передаем диспатч таскок в редьюсер листов, либо создаем тут переменную [айди](const newID = v1()) и делаем 2 диспатча

    const removeList = useCallback((toDoListId: string) => {
        dispatch(listsThunk.deleteAPIListTC(toDoListId))
    }, [])// можно еще добавить delete

    const exitHandler = () => {
       dispatch(authThunk.logout())
    }


    const mappedLists = toDoLists.map((tl) => { //мапим массив со всеми тудулистами
        return (
            <ToDoList
                key={tl.id}
                titleList={tl.title}
                filter={tl.filter}
                toDoListID={tl.id}
                removeList={removeList}
                listIsLoading={tl.listIsLoading}
            />
        )
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>   //если isLogin фолс, редиректи на логин
    }

    return (
        <>
            <div className="buttonExitWrapper">
                <button onClick={exitHandler}>EXIT</button>
            </div>
            <span>New List </span>
            <InputAdd disabled={!isLoggedIn} clickToAddTask={addList}/>
            <div className="App">
                {mappedLists}
            </div>
        </>
    )
}