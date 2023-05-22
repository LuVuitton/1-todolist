import React, {useEffect} from "react";
import {List, listActionsGroup, listSelectors} from "../../features/list";
import {authActionsGroup, authSelectors} from "../../features/auth";
import {InputAdd} from "../reusedComponents/inputAdd/InputAdd";
import {useActions, useCustomSelector} from "../../customHooks";
import {Navigate} from "react-router-dom";
import s from './style.module.css'


export const MainContainer = () => {

    const {getListTC, addListAndEmptyTasks} = useActions(listActionsGroup)
    const {logout} = useActions(authActionsGroup)

    const toDoLists = useCustomSelector(listSelectors.selectLists)
    const isLoggedIn = useCustomSelector(authSelectors.selectIsLoading)

    useEffect(() => {
        isLoggedIn && getListTC({})
    }, [])


    const addList = (inputValue: string) => {
        return addListAndEmptyTasks(inputValue).unwrap()
    }

    const exitHandler = () => logout({})


    const mappedLists = toDoLists.map((tl) => { //мапим массив со всеми тудулистами
        return (
            <List
                key={tl.id}
                listID={tl.id}
                listFilter={tl.filter}
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
            <InputAdd disabled={!isLoggedIn} clickToAdd={addList}/>
            <div className={s.listWrapper}>
                {mappedLists}
            </div>
        </>
    )
}