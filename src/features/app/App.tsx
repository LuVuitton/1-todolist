import React, { useEffect } from 'react';
import s from './style.module.css';
import { ErrorSnackbar } from "../../components/ErrorSnackbar";
import { Login } from "../auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainContainer } from "../../components/MainContainer/MainContainer";
import { appSelectors } from './'
import { authActionsGroup } from "../auth";
import { useCustomSelector, useActions } from "../../customHooks";


//убрать юз колбэки / реакт мемо / юз мемо там где они не нужны

export const App = () => {

    const globalStatus = useCustomSelector(appSelectors.selectGlobalEntityStatus)
    const isInitialized = useCustomSelector(appSelectors.selectIsInitialized)
    const { checkMe } = useActions(authActionsGroup)

    useEffect(() => {
        //преверяем залогиген или нет, если да меняем стейт
        checkMe({})
    }, [])


    if (!isInitialized) {
        return <div className={s.firstLoading}><span>LOADING...</span></div>
    }

    return (
        <div className={s.mainWrapper}>
            <div style={{ height: '20px' }}>
                {
                    globalStatus === 'loading' &&
                    <span style={{ color: 'red' }}> LOADING...</span>
                }
            </div>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<MainContainer />} />

                <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                <Route path='*' element={<Navigate to='/404' />} />
            </Routes>
            <ErrorSnackbar />
        </div>
    );
}

