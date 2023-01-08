import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterType = 'all' | 'completed' | 'active';
type ToDoListType = {
    id: string
    title: string
    filter: FilterType
}



function App() {
    const idToDoList1 = v1();
    const idToDoList2 = v1();

    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: idToDoList1, title: 'What to learn', filter: 'active'}, //тут без [] потому как переменная стоит не в ключе а в значении
        {id: idToDoList2, title: 'What to buy', filter: 'completed'},
    ])
    const [tasks, setTasks] = useState({
        [idToDoList1]: [                                                        //зы. походу если не обернуть он создвст отдельный ключ никак не связаный с переменной в которой вложена строка
            {id: v1(), type: "checkbox", checked: true, item: 'HTML&CSS',},
            {id: v1(), type: "checkbox", checked: false, item: 'Redux'},
            {id: v1(), type: "checkbox", checked: true, item: 'JS'},
            {id: v1(), type: "checkbox", checked: false, item: 'MongoDB'},
            {id: v1(), type: "checkbox", checked: false, item: 'React'},
        ],
        [idToDoList2]: [
            {id: v1(), type: "checkbox", checked: true, item: '1',},
            {id: v1(), type: "checkbox", checked: false, item: '2'},
            {id: v1(), type: "checkbox", checked: true, item: '3'},
            {id: v1(), type: "checkbox", checked: false, item: '4'},
            {id: v1(), type: "checkbox", checked: false, item: '5'},
        ]
    })
    function switchCheckbox(taskId: string, checked: boolean, toDoListId: string) {

        const taskForChange = tasks[toDoListId].find(e => e.id === taskId)
        if (taskForChange) {
            taskForChange.checked = !checked
        }
        setTasks({...tasks})
    }
    function removeTask(taskID: string, toDoListId: string) {
        const specificToDOList = tasks[toDoListId] //находим тудулист
        tasks[toDoListId] = specificToDOList.filter((e)=>e.id !== taskID ) //меняем в нужном тудулисте масив таксок на отфильтрованый
        setTasks({...tasks})
    }
    function addTask(value: string, toDoListId: string) {
        const newTask = {id: v1(), type: "checkbox", checked: false, item: value}
        tasks[toDoListId].unshift(newTask)
        setTasks({...tasks})
    }
    function changeFilter(value: FilterType, toDoListId: string) {
        const specificToDOList = toDoLists.find(e => e.id === toDoListId) //находим нужный тудулист
        if (specificToDOList) {                                           // проверяем как просит тс и меняем значение!! т.к это обьект(ссылочный тип данных), значение меняется везде не тольео в переменной для find()
            specificToDOList.filter = value                               // ПОЭТОМУ
            setToDoLists([...toDoLists])                            // сетать можем тот же самый обьект
        }
    }
    function removeList(toDoListId: string) {
        const filteredToDoLists = toDoLists.filter(e=>e.id !== toDoListId)
        setToDoLists(filteredToDoLists)
        delete tasks[toDoListId]
        setTasks({...tasks}) //это необязательно
    }




    return (
        <div className="App">

            {
                toDoLists.map((tl) => { //мапим массив со всеми тудулистами

                    let tasksForProps = tasks[tl.id];

                    if (tl.filter === 'active') {
                        tasksForProps = tasks[tl.id].filter(e => e.checked !== true)
                    }
                    if (tl.filter === 'completed') {
                        tasksForProps = tasks[tl.id].filter(e => e.checked !== false)
                    }


                    return <ToDoList                    //на основе свойст каждого обьекта в массиве(пока там только фильтры, заголовки, id разные) создается один компонент тудулиста
                        key={tl.id}                     // все остальное общее для каждого тудулиста
                        tasks={tasksForProps}
                        title={tl.title}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        switchCheckbox={switchCheckbox}
                        filter={tl.filter}
                        toDoListId={tl.id}
                        removeList={removeList}
                    />
                })
            }


        </div>
    );
}

export default App;
