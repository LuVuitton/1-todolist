import React from 'react';
import '../styles/App.css';
import {ToDoList} from "./ToDoList";
import InputAdd from "./InputAdd";
import {FilterType, TasksType, ToDoListType} from "../Types";
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
    console.log('app')

    const dispatch = useDispatch()
    let toDoLists = useSelector<rootStateType, ToDoListType[]>(state => state.lists)
    let tasks = useSelector<rootStateType, TasksType>(state => state.tasks)


    const changeListFilter = (value: FilterType, toDoListId: string) => dispatch(changeFilterListAC(value, toDoListId))

    const addList = (inputValue: string) => {
        const newListID = v1()
        dispatch(addListAC(inputValue, newListID))
        dispatch(addArrTasksAC(newListID))
    } //передаем диспатч таскок в редьюсер листов, либо создаем тут переменную [айди](const newID = v1()) и делаем 2 диспатча

    const removeList = (toDoListId: string) => dispatch(removeListAC(toDoListId)) // можно еще добавить delete

    const addEditedListTitle = (value: string, toDoListID: string) => dispatch(addEditedListTitleAC(value, toDoListID))


    const addTask = (inputValue: string, toDoListId: string) => dispatch(addTaskAC(inputValue, toDoListId))

    const removeTask = (taskID: string, toDoListId: string) => dispatch(removeTaskAC(taskID, toDoListId))

    const switchCheckbox = (taskId: string, checked: boolean, toDoListId: string) => dispatch(switchCheckboxAC(taskId, checked, toDoListId))

    const addEditedTask = (value: string, toDoListId: string, taskId: string) => dispatch(addEditedTaskAC(value, toDoListId, taskId))


// по поводу реюзабельного инпута для тасок и новых тудулистов
// мы создали две разные функции в апп(добавить такси(принимает вэлью и айдиЛиста) и добавить тудулисты(принимает тольео вэдью))
// в добавить туду листы отправили нужную и забрали оттуда вэлью с инпута, всё
// в добавить таски, конечная кнопка лежит во вложеной компоненте апп->тудулист->кнопка
// мы прокинули добавитьТаску только в тудулист, обернули ее функцией которая принимает только инвутВэлью и прокинули в компоненту уже обертку
// в итоге! при нажатии на кнопку, инпут передает только значение внутри себя(как и в добавитьТудулист) НО в случает с АддТудуЛист, он передает значение напрямую в АПП, птому как кроме значение инпута ему ничего не нужно
// а в случае с АддТаск кнопка передает значение сначала обертке, внутри которой срабатывает АддТаск из Апп, и по дороге добавляет нужный АЙДИтудулиста
    return (
        <div className="App">
            <div>New List</div>
            <InputAdd clickToAddTask={addList}/>
            {
                toDoLists.map((tl) => { //мапим массив со всеми тудулистами

                    let tasksForProps = tasks[tl.toDoListID];

                    if (tl.filter === 'active') {
                        tasksForProps = tasks[tl.toDoListID].filter((e) => e.checked !== true)
                    }
                    if (tl.filter === 'completed') {
                        tasksForProps = tasks[tl.toDoListID].filter((e) => e.checked !== false)
                    }


                    return (
                        <ToDoList                    //на основе свойст каждого обьекта в массиве(пока там только фильтры, заголовки, id разные) создается один компонент тудулиста
                            key={tl.toDoListID}                     // все остальное общее для каждого тудулиста
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
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
