import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";
import InputAdd from "./InputAdd";

export type FilterType = 'all' | 'completed' | 'active';
type ToDoListType = {
    id: string
    title: string
    filter: FilterType
}
type TasksArrType = {
    [key:string]:Array<TaskType> //ключ это айди туду листа
}



function App() {

    const idToDoList1 = v1();
    const idToDoList2 = v1();

    const [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: idToDoList1, title: 'What to learn', filter: 'all'}, //тут без [] потому как переменная стоит не в ключе а в значении
        {id: idToDoList2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksArrType>({
        [idToDoList1]: [                             //походу если не обернуть он создвст отдельный ключ никак не связаный с переменной в которой вложена строка
            {id: v1(), type: "checkbox", checked: true, taskValue: 'HTML&CSS',},
            {id: v1(), type: "checkbox", checked: false, taskValue: 'Redux'},
            {id: v1(), type: "checkbox", checked: true, taskValue: 'JS'},
            {id: v1(), type: "checkbox", checked: false, taskValue: 'MongoDB'},
            {id: v1(), type: "checkbox", checked: false, taskValue: 'React'},
        ],
        [idToDoList2]: [
            {id: v1(), type: "checkbox", checked: true, taskValue: '1',},
            {id: v1(), type: "checkbox", checked: false, taskValue: '2'},
            {id: v1(), type: "checkbox", checked: true, taskValue: '3'},
            {id: v1(), type: "checkbox", checked: false, taskValue: '4'},
            {id: v1(), type: "checkbox", checked: false, taskValue: '5'},
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
        tasks[toDoListId] = specificToDOList.filter((e) => e.id !== taskID) //меняем в нужном тудулисте масив таксок на отфильтрованый
        setTasks({...tasks})
    }

    function addTask(inputValue: string, toDoListId: string) {
        const newTask = {id: v1(), type: "checkbox", checked: false, taskValue: inputValue}
        tasks[toDoListId].unshift(newTask)
        setTasks({...tasks})
    }

    function addToDoList(inputValue: string) {
        const newToDoList: ToDoListType = {id: v1(), title: inputValue, filter: 'all'}
        setToDoLists([newToDoList, ...toDoLists])
        setTasks({...tasks, [newToDoList.id]: []})
    }

    function changeFilter(value: FilterType, toDoListId: string) {
        const specificToDOList = toDoLists.find(e => e.id === toDoListId) //находим нужный тудулист
        if (specificToDOList) {                                           // проверяем как просит тс и меняем значение!! т.к это обьект(ссылочный тип данных), значение меняется везде не тольео в переменной для find()
            specificToDOList.filter = value                               // ПОЭТОМУ
            setToDoLists([...toDoLists])                            // сетать можем тот же самый обьект
        }
    }

    function removeList(toDoListId: string) {
        const filteredToDoLists = toDoLists.filter(e => e.id !== toDoListId)
        setToDoLists(filteredToDoLists)
        delete tasks[toDoListId]
        setTasks({...tasks}) //это необязательно
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
            <InputAdd clickToAddTask={addToDoList}/>
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
                        addItem={addTask}
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
