import React, {useEffect} from 'react';
import '../styles/App.css';
import {useCustomSelector} from "../customHooks/CustomHooks";
import {GlobalRequestStatusType} from "../redux/reducers/globalReducer";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Login} from "./Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {MainContainer} from "./MainContainer";
import {useCustomThunkDispatch} from "../redux/store";
import {checkLoginTC} from "../redux/reducers/authReducer";


//убрать юз колбэки / реакт мемо / юз мемо там где они не нужны

const App = () => {
    const dispatch = useCustomThunkDispatch()
    const globalStatus = useCustomSelector<GlobalRequestStatusType>(state => state.global.status)


    useEffect(() => {         //преверяем залогиген или нет, если да меняем стейт
        dispatch(checkLoginTC())
    }, [])


    return (
        <>
            {globalStatus === 'loading' && <span style={{color: 'red'}}> LOADING...</span>}
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={<MainContainer/>}/>

                <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path='*' element={<Navigate to='/404'/>}/>
            </Routes>
            <ErrorSnackbar/>
        </>
    );
}

export default App;
