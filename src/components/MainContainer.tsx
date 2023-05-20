import {InputAdd} from "./reusedComponents/inputAdd/InputAdd";
import React, {useCallback, useEffect} from "react";
import {useBoundDispatch, useCustomSelector} from "../customHooks";
import {List} from "../features/list";
import {Navigate} from "react-router-dom";
import {listActionsGroup, listSelectors} from "../features/list";
import {authActionsGroup, authSelectors} from "../features/auth";


export const MainContainer = () => {

    // описание кастомного диспатча в сторе
    // const dispatch = useCustomThunkDispatch()
    const {getListTC, addListAndEmptyTasks, deleteAPIListTC} = useBoundDispatch(listActionsGroup)
    const {logout} = useBoundDispatch(authActionsGroup)


    // описание кастомного селектора в кастомных хуках
    const toDoLists = useCustomSelector(listSelectors.selectLists)
    const isLoggedIn = useCustomSelector(authSelectors.selectIsLoading)

    useEffect(() => {
        if (isLoggedIn) {
            getListTC()
        }
    }, [])


    const addList = useCallback((inputValue: string) => addListAndEmptyTasks(inputValue), [])

    // можно еще добавить delete
    const removeList = useCallback((toDoListId: string) => deleteAPIListTC(toDoListId), [])

    const exitHandler = () => logout()


    const mappedLists = toDoLists.map((tl) => { //мапим массив со всеми тудулистами
        return (
            <List
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