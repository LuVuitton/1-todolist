import {InputAdd} from "./InputAdd";
import React, {useCallback, useEffect} from "react";
import {useCustomThunkDispatch} from "../redux/store";
import {useCustomSelector} from "../customHooks/CustomHooks";
import {OneToDoListAPIType} from "../Types";
import {addAPIListTC, deleteAPIListTC, getListTC} from "../redux/reducers/listReducers";
import {ToDoList} from "./ToDoList";


export const MainContainer = () => {

    // описание кастомного диспатча в сторе
    const dispatch = useCustomThunkDispatch()
    // описание кастомного селектора в кастомных хуках
    const toDoLists = useCustomSelector<OneToDoListAPIType[]>(state => state.lists)

    useEffect(() => {
        dispatch(getListTC())
    }, [])


    const addList = useCallback((inputValue: string) => {
        dispatch( addAPIListTC(inputValue))
    }, []) //передаем диспатч таскок в редьюсер листов, либо создаем тут переменную [айди](const newID = v1()) и делаем 2 диспатча

    const removeList = useCallback((toDoListId: string) => {
        dispatch(deleteAPIListTC(toDoListId))
    }, [])// можно еще добавить delete


    const mappedLists = toDoLists.map((tl) => { //мапим массив со всеми тудулистами
        return (
            <ToDoList
                key={tl.id}
                titleList={tl.title}
                filter={tl.filter}
                toDoListID={tl.id}
                removeList={removeList}
                entityStatus = {tl.entityStatus}
            />
        )
    })

    return (
        <>
            <span>New List </span>
            <InputAdd clickToAddTask={addList}/>
            <div className="App">
                {mappedLists}
            </div>
        </>
    )
}