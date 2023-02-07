import React, {useReducer} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import InputAdd from "./InputAdd";
import {FilterType} from "./Types";
import {listReducer} from "./reducers/listReducers";
import {taskReducer} from "./reducers/taskReduser";
import {
    addEditedListTitleAC,
    addEditedTaskAC,
    addListAC, addTaskAC,
    changeFilterListAC, removeListAC,
    removeTaskAC,
    switchCheckboxAC
} from "./ActionCreators/ActionCreators";


function App() {

    const idToDoList1 = v1(); //значение свойства toDoListID с айди в тудулисте и ключ листа в массиве тасок
    const idToDoList2 = v1(); //это не одна и таже строка, она просто совпадает по знаечению (НО ЭТО НЕ ТОЧНО)

    let [toDoLists, dispatchLists] = useReducer(listReducer, [
        {toDoListID: idToDoList1, titleList: 'what to learn', filter: 'all'}, //тут без [] потому как переменная стоит не в ключе а в значении
        {toDoListID: idToDoList2, titleList: 'numbers', filter: 'all'}
    ])
    let [tasks, dispatchTasks] = useReducer(taskReducer, {          // юзРедьюсер принимает нужный редьюсер и начальное значение
        [idToDoList1]: [                             //походу если не обернуть он создвст отдельный ключ никак не связаный с переменной в которой вложена строка
            {taskID: v1(), type: "checkbox", checked: true, taskValue: 'HTML&CSS',},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'Redux'},
            {taskID: v1(), type: "checkbox", checked: true, taskValue: 'JS'},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'MongoDB'},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'React'},
        ],
        [idToDoList2]: [
            {taskID: v1(), type: "checkbox", checked: true, taskValue: 'pervoe',},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'vtoroe'},
            {taskID: v1(), type: "checkbox", checked: true, taskValue: 'trete'},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'chetvertoe'},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'piatoe'},
        ]
    })



    const changeListFilter=(value: FilterType, toDoListId: string) => dispatchLists(changeFilterListAC(value,toDoListId))

    const addList = (inputValue: string)=>  dispatchLists(addListAC(inputValue, dispatchTasks)) //передаем диспатч таскок в редьюсер листов, либо создаем тут переменную [айди](const newID = v1()) и делаем 2 диспатча

    const removeList = (toDoListId: string)=> dispatchLists(removeListAC(toDoListId)) // можно еще добавить delete

    const addEditedListTitle = (value: string, toDoListID: string)=> dispatchLists(addEditedListTitleAC(value, toDoListID))


    const addTask = (inputValue: string, toDoListId: string)=> dispatchTasks(addTaskAC(inputValue, toDoListId))

    const removeTask = (taskID: string, toDoListId: string)=> dispatchTasks(removeTaskAC(taskID, toDoListId))

    const switchCheckbox = (taskId: string, checked: boolean, toDoListId: string)=> dispatchTasks(switchCheckboxAC(taskId, checked, toDoListId))

    const addEditedTask = (value: string, toDoListId: string, taskId: string)=> dispatchTasks(addEditedTaskAC(value, toDoListId, taskId))



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
