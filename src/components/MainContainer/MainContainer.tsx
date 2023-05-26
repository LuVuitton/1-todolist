import { useEffect } from "react";
import { List, listActionsGroup, listSelectors } from "../../features/list";
import {  authSelectors } from "../../features/auth";
import { useActions, useCustomSelector } from "../../customHooks";
import { Navigate } from "react-router-dom";
import s from './style.module.css'
import { Header } from "../../features/header/header";




export const MainContainer = () => {

    const { getListTC } = useActions(listActionsGroup)

    const toDoLists = useCustomSelector(listSelectors.selectLists)
    const isLoggedIn = useCustomSelector(authSelectors.selectIsLoading)

    useEffect(() => {
        isLoggedIn && getListTC({})
    }, [])


  



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
        return <Navigate to={'/login'} />   //если isLogin фолс, редиректи на логин
    }

    return (
        <>
           <Header/>

            <div className={s.listsWrapper}>
                {mappedLists}
            </div>
        </>
    )
}