import React, {useEffect} from "react";
import {List, listActionsGroup, listSelectors} from "../../features/list";
import {authActionsGroup, authSelectors} from "../../features/auth";
import {InputAdd} from "../reusedComponents/inputAdd/InputAdd";
import {useActions, useCustomSelector} from "../../customHooks";
import {Navigate} from "react-router-dom";
import s from './style.module.css'


export const MainContainer = () => {

    // описание кастомного диспатча в сторе
    // const dispatch = useCustomThunkDispatch()
    const {getListTC, addListAndEmptyTasks} = useActions(listActionsGroup)
    const {logout} = useActions(authActionsGroup)


    // описание кастомного селектора в кастомных хуках
    const toDoLists = useCustomSelector(listSelectors.selectLists)
    const isLoggedIn = useCustomSelector(authSelectors.selectIsLoading)

    useEffect(() => {
        if (isLoggedIn) {
            getListTC()
        }
    }, [])


    const addList = (inputValue: string) => addListAndEmptyTasks(inputValue)
    // можно еще добавить delete
    // const removeList = useCallback((toDoListId: string) => deleteAPIListTC(toDoListId), [])
    const exitHandler = () => logout()


    const mappedLists = toDoLists.map((tl) => { //мапим массив со всеми тудулистами
        return (
            <List
                key={tl.id}
                listTitle={tl.title}
                listID={tl.id}
                listIsLoading={tl.listIsLoading}
            />
        )
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>   //если isLogin фолс, редиректи на логин
    }

    return (
        <>
            <div className={s.btnExitWrapper}>
                <button onClick={exitHandler}>EXIT</button>
            </div>
            <span> New List </span>
            <InputAdd disabled={!isLoggedIn} clickToAddTask={addList}/>
            <div className={s.mainWrapper}>
                {mappedLists}
            </div>
        </>
    )
}