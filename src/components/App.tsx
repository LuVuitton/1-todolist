import React, {useCallback, useMemo} from 'react';
import '../styles/App.css';
import {ToDoList} from "./ToDoList";
import {InputAdd} from "./InputAdd";
import {FilterButtonDataType, FilterType, TasksType, ToDoListType} from "../Types";
import {
    addArrTasksAC,
    addEditedListTitleAC,
    addEditedTaskAC,
    addListAC, addTaskAC,
    changeFilterListAC, removeListAC,
    removeTaskAC,
    switchCheckboxAC
} from "../actionCreators/ActionCreators";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "../redux/store";
import {v1} from "uuid";


function App() {
    console.log('App')
    const dispatch = useDispatch()
    let toDoLists = useSelector<rootStateType, ToDoListType[]>(state => state.lists)
    let tasks = useSelector<rootStateType, TasksType>(state => state.tasks)

    const filterButtonsData: FilterButtonDataType[] = [
        {id: v1(), title: 'all'},
        {id: v1(), title: 'active'},
        {id: v1(), title: 'completed'},
    ]




    const changeListFilter = useCallback((value: FilterType, toDoListId: string) => dispatch(changeFilterListAC(value, toDoListId)),[])

    const addList = useCallback((inputValue: string) => {
        const newListID = v1()
        dispatch(addListAC(inputValue, newListID))
        dispatch(addArrTasksAC(newListID))
    },[]) //передаем диспатч таскок в редьюсер листов, либо создаем тут переменную [айди](const newID = v1()) и делаем 2 диспатча

    const removeList = useCallback((toDoListId: string) => dispatch(removeListAC(toDoListId)) ,[])// можно еще добавить delete

    const addEditedListTitle = useCallback((value: string, toDoListID: string) => dispatch(addEditedListTitleAC(value, toDoListID)),[])


    const addTask = useCallback((inputValue: string, toDoListId: string) => dispatch(addTaskAC(inputValue, toDoListId)),[])

    const removeTask = useCallback((taskID: string, toDoListId: string) => dispatch(removeTaskAC(taskID, toDoListId)),[])

    const switchCheckbox = useCallback((taskId: string, checked: boolean, toDoListId: string) => dispatch(switchCheckboxAC(taskId, checked, toDoListId)),[])

    const addEditedTask = useCallback((value: string, toDoListId: string, taskId: string) => dispatch(addEditedTaskAC(value, toDoListId, taskId)),[])

    const mappedLists = toDoLists.map((tl) => { //мапим массив со всеми тудулистами

                let tasksForProps = tasks[tl.toDoListID];

                if (tl.filter === 'active') {
                    tasksForProps = tasks[tl.toDoListID].filter((e) => !e.checked)
                }
                if (tl.filter === 'completed') {
                    tasksForProps = tasks[tl.toDoListID].filter((e) => e.checked)
                }

                return (
                    <ToDoList
                        key={tl.toDoListID}
                        tasks={tasksForProps}
                        titleList={tl.titleList}
                        removeTask={removeTask}
                        changeFilter={changeListFilter}
                        addItem={addTask}
                        switchCheckbox={switchCheckbox}
                        filter={tl.filter}
                        toDoListID={tl.toDoListID}
                        removeList={removeList}
                        addEditedTask={addEditedTask}
                        addEditedListTitle={addEditedListTitle}
                        filterButtonsData={filterButtonsData}
                    />
                )
            })


return (
        <div className="App">
            <div>New List</div>
            <InputAdd clickToAddTask={addList}/>
            {mappedLists}
        </div>
    );
}

export default App;
