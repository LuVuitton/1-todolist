import React, {useCallback, useEffect} from 'react';
import '../styles/App.css';
import {ToDoList} from "./ToDoList";
import {InputAdd} from "./InputAdd";
import {OneToDoListAPIType} from "../Types";

import {useCustomThunkDispatch} from "../redux/store";
import {addAPIListTC, deleteAPIListTC, getListTC} from "../redux/reducers/listReducers";
import {useCustomSelector} from "../customHooks/CustomHooks";
import {tasksAPI} from "../API-Functional/TasksAPI";


//убрать юз колбэки \ реакт мемо \ юз мемо там где они не нужны
// где диспатчить?

const App = () => {


    // описание кастомного диспатча в сторе
    const dispatch = useCustomThunkDispatch()

    // описание кастомного диспатча в кастомных хуках
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
            />
        )
    })

    const testPUT = ()=> {
       tasksAPI.updateTask('04eed9b9-1e7c-4b78-8430-48f22589a71b','a6520c9d-f4a9-4752-9aa1-fa0f7b40b8f1', 'NEWVALUE')
    }

    return (
        <>
            <div>New List</div>
            <InputAdd clickToAddTask={addList}/>
            <div className="App">

                {mappedLists}
                {/*<TestComp/>*/}

            </div>
            <button onClick={testPUT}>NEWVALUE</button>
        </>
    );
}

export default App;
