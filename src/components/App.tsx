import React, {useCallback} from 'react';
import '../styles/App.css';
import {ToDoList} from "./ToDoList";
import {InputAdd} from "./InputAdd";
import {ToDoListType} from "../Types";
import {
    addArrTasksAC,
    addListAC,
    removeListAC,
} from "../actionCreators/ActionCreators";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "../redux/store";
import {v1} from "uuid";
import {TestComp} from "./TestComp";


//убрать юз колбэки \ реакт мемо \ юз мемо там где они не нужны
// где диспатчить?

const App = () => {


    const dispatch = useDispatch()
    const toDoLists = useSelector<rootStateType, ToDoListType[]>(state => state.lists)


    const addList = useCallback((inputValue: string) => {
        const newListID = v1()
        dispatch(addListAC(inputValue, newListID))
        dispatch(addArrTasksAC(newListID))
    }, []) //передаем диспатч таскок в редьюсер листов, либо создаем тут переменную [айди](const newID = v1()) и делаем 2 диспатча

    const removeList = useCallback((toDoListId: string) => dispatch(removeListAC(toDoListId)), [])// можно еще добавить delete


    const mappedLists = toDoLists.map((tl) => { //мапим массив со всеми тудулистами
        return (
            <ToDoList
                key={tl.toDoListID}
                titleList={tl.titleList}
                filter={tl.filter}
                toDoListID={tl.toDoListID}
                removeList={removeList}
            />
        )})


    return (
        <div className="App">
            <div>New List</div>
            <InputAdd clickToAddTask={addList}/>
            {mappedLists}
            <TestComp/>
        </div>
    );
}

export default App;
