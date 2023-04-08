import React from 'react';
import '../styles/App.css';
import {useCustomSelector} from "../customHooks/CustomHooks";
import {GlobalRequestStatusType} from "../redux/reducers/globalReducer";
import {ErrorSnackbar} from "./ErrorSnackbar";
import {Login} from "./Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {MainContainer} from "./MainContainer";


//убрать юз колбэки \ реакт мемо \ юз мемо там где они не нужны

const App = () => {

    const globalStatus = useCustomSelector<GlobalRequestStatusType>(state => state.global.status)

    return (
        <>
            {globalStatus === 'loading' && <span style={{color: 'red'}}> LOADING...</span>}
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/main' element={<MainContainer/>}/>

                <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path='*' element={<Navigate to='/404'/>}/>
            </Routes>
            <ErrorSnackbar/>
        </>
    );
}

export default App;
