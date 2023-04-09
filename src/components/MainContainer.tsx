import {InputAdd} from "./InputAdd";
import React, {useCallback, useEffect} from "react";
import {useCustomThunkDispatch} from "../redux/store";
import {useCustomSelector} from "../customHooks/CustomHooks";
import {OneToDoListAPIType} from "../Types";
import {addAPIListTC, deleteAPIListTC, getListTC} from "../redux/reducers/listReducers";
import {ToDoList} from "./ToDoList";
import {Navigate} from "react-router-dom";
import {logOutTC} from "../redux/reducers/authReducer";


export const MainContainer = () => {

    // описание кастомного диспатча в сторе
    const dispatch = useCustomThunkDispatch()
    // описание кастомного селектора в кастомных хуках
    const toDoLists = useCustomSelector<OneToDoListAPIType[]>(state => state.lists)
    const isLogin = useCustomSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLogin) {
            dispatch(getListTC())
        }
    }, [])


    const addList = useCallback((inputValue: string) => {
        dispatch(addAPIListTC(inputValue))
    }, []) //передаем диспатч таскок в редьюсер листов, либо создаем тут переменную [айди](const newID = v1()) и делаем 2 диспатча

    const removeList = useCallback((toDoListId: string) => {
        dispatch(deleteAPIListTC(toDoListId))
    }, [])// можно еще добавить delete

    const exitHandler = () => {
       dispatch(logOutTC())
    }


    const mappedLists = toDoLists.map((tl) => { //мапим массив со всеми тудулистами
        return (
            <ToDoList
                key={tl.id}
                titleList={tl.title}
                filter={tl.filter}
                toDoListID={tl.id}
                removeList={removeList}
                entityStatus={tl.entityStatus}
            />
        )
    })

    if (!isLogin) {
        return <Navigate to={'/login'}/>   //если isLogin фолс, редиректи на логин
    }

    return (
        <>
            <div className="buttonExitWrapper">
                <button onClick={exitHandler}>EXIT</button>
            </div>
            <span>New List </span>
            <InputAdd disabled={!isLogin} clickToAddTask={addList}/>
            <div className="App">
                {mappedLists}
            </div>
        </>
    )
}