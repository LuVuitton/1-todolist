import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";
import InputAdd from "./InputAdd";

export type FilterType = 'all' | 'completed' | 'active';
type ToDoListType = {
    toDoListID: string
    titleList: string
    filter: FilterType
}
type TasksArrType = {
    [key: string]: Array<TaskType> //ключ это айди туду листа
}


function App() {

    const idToDoList1 = v1();
    const idToDoList2 = v1();

    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {toDoListID: idToDoList1, titleList: 'what to learn', filter: 'all'}, //тут без [] потому как переменная стоит не в ключе а в значении
        {toDoListID: idToDoList2, titleList: 'numbers', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksArrType>({
        [idToDoList1]: [                             //походу если не обернуть он создвст отдельный ключ никак не связаный с переменной в которой вложена строка
            {taskID: v1(), type: "checkbox", checked: true, taskValue: 'HTML&CSS',},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'Redux'},
            {taskID: v1(), type: "checkbox", checked: true, taskValue: 'JS'},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'MongoDB'},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'React'},
        ],
        [idToDoList2]: [
            {taskID: v1(), type: "checkbox", checked: true, taskValue: 'slovo odin',},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'slovo dva'},
            {taskID: v1(), type: "checkbox", checked: true, taskValue: 'slovo tri'},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'slovo chetire'},
            {taskID: v1(), type: "checkbox", checked: false, taskValue: 'slovo piat'},
        ]
    })

    function addList(inputValue: string) {
        const newToDoList: ToDoListType = {toDoListID: v1(), titleList: inputValue, filter: 'all'}
        setToDoLists([newToDoList, ...toDoLists])
        setTasks({...tasks, [newToDoList.toDoListID]: []})
    }
    function removeList(toDoListId: string) {
        const filteredToDoLists = toDoLists.filter(e => e.toDoListID !== toDoListId)
        setToDoLists(filteredToDoLists)
        delete tasks[toDoListId]
        setTasks({...tasks}) //это необязательно
    }
    function addTask(inputValue: string, toDoListId: string) {
        const newTask = {taskID: v1(), type: "checkbox", checked: false, taskValue: inputValue}
        const toDoListTasks = tasks[toDoListId]
        tasks[toDoListId] = [newTask, ...toDoListTasks]         // весь эд такс списал с домашки
        setTasks({...tasks})
    }
    function removeTask(taskID: string, toDoListId: string) {
        const specificToDOList = tasks[toDoListId] //находим тудулист
        tasks[toDoListId] = specificToDOList.filter((e) => e.taskID !== taskID) //меняем в нужном тудулисте масив таксок на отфильтрованый
        setTasks({...tasks})
    }
    function switchCheckbox(taskId: string, checked: boolean, toDoListId: string) {

        const taskForChange = tasks[toDoListId].find(e => e.taskID === taskId)
        if (taskForChange) {
            taskForChange.checked = !checked
        }
        setTasks({...tasks})
    }
    function changeFilter(value: FilterType, toDoListId: string) {
        const specificToDOList = toDoLists.find(e => e.toDoListID === toDoListId) //находим нужный тудулист
        if (specificToDOList) {                                           // проверяем как просит тс и меняем значение!! т.к это обьект(ссылочный тип данных), значение меняется везде не тольео в переменной для find()
            specificToDOList.filter = value                               // ПОЭТОМУ
            setToDoLists([...toDoLists])                            // сетать можем тот же самый обьект
        }
    }
    function addEditedTask (value:string, toDoListId:string, taskId: string) {
        tasks[toDoListId].map((e)=>{
           if (e.taskID === taskId){
               e.taskValue = value
               setTasks({...tasks})
           }
        })
    }
    function addEditedListTitle (value: string, toDoListID:string) {
        toDoLists.map((e)=> {
            if(e.toDoListID === toDoListID){
                e.titleList = value
                setToDoLists([...toDoLists])
            }
        })
    }



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
                        tasksForProps = tasks[tl.toDoListID].filter(e => e.checked !== true)
                    }
                    if (tl.filter === 'completed') {
                        tasksForProps = tasks[tl.toDoListID].filter(e => e.checked !== false)
                    }


                    return (
                            <ToDoList                    //на основе свойст каждого обьекта в массиве(пока там только фильтры, заголовки, id разные) создается один компонент тудулиста
                                key={tl.toDoListID}                     // все остальное общее для каждого тудулиста
                                tasks={tasksForProps}
                                titleList={tl.titleList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
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
