import React, {useCallback, useEffect} from 'react';
import '../styles/App.css';
import {ToDoList} from "./ToDoList";
import {InputAdd} from "./InputAdd";
import {incompleteListAPIType, OneToDoListAPIType} from "../Types";
import {
    addArrTasksAC,
    addListAC,
    removeListAC, setAPIListsAC, setAPITasksAC,
} from "../actionCreators/ActionCreators";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "../redux/store";
import {v1} from "uuid";
import {toDoListsAPI} from "../API-Functional/ToDoListsAPI";
import {tasksAPI} from "../API-Functional/TasksAPI";
import {getListTC} from "../redux/reducers/listReducers";


//убрать юз колбэки \ реакт мемо \ юз мемо там где они не нужны
// где диспатчить?

const App = () => {

    const dispatch = useDispatch()
    const toDoLists = useSelector<rootStateType, OneToDoListAPIType[]>(state => state.lists)

    useEffect(() => {
        // @ts-ignore !!!!!!!!!!!!!!!!???
        dispatch(getListTC())
    }, [])

    const addList = useCallback((inputValue: string) => {
        const newListID = v1()
        dispatch(addListAC(inputValue, newListID))
        dispatch(addArrTasksAC(['2323232', '22323323']))
    }, []) //передаем диспатч таскок в редьюсер листов, либо создаем тут переменную [айди](const newID = v1()) и делаем 2 диспатча

    const removeList = useCallback((toDoListId: string) => dispatch(removeListAC(toDoListId)), [])// можно еще добавить delete


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

    const callGetLists = () => {
        let listsID: string[] = []
        toDoListsAPI.getLists()
            .then((r: incompleteListAPIType[]) => {
                listsID = r.map((e: incompleteListAPIType) => e.id)

                dispatch(setAPIListsAC(r))
                // dispatch(addArrTasksAC(listsID))
            })
            .then(() => {
                tasksAPI.getTasks(listsID[0]).then(r => dispatch(setAPITasksAC(r, listsID[0])))
            })
    }

    const callPostList = () => {
        toDoListsAPI.postList('tretiy list')
    }

    return (
        <div className="App">
            <div>New List</div>
            <InputAdd clickToAddTask={addList}/>
            {mappedLists}
            {/*<TestComp/>*/}
            <button onClick={callGetLists}>SET LIST TASKS</button>
            <button onClick={callPostList}>POST LIST</button>
        </div>
    );
}

export default App;
