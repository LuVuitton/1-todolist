import React, {useCallback, useMemo, useState} from 'react';
import {InputAdd} from "./InputAdd";
import {EditableSpan} from "./EditableSpan";
import {FilterButtonDataType, FilterType, TaskType, ToDoListPropsType} from "../Types";
import {FilterButton} from "./FilterButton";
import {Task} from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "../redux/store";
import {v1} from "uuid";
import {
    addEditedListTitleAC,
    addEditedTaskAC,
    addTaskAC,
    removeTaskAC,
    switchCheckboxAC
} from "../actionCreators/ActionCreators";


export const ToDoList = React.memo((props: ToDoListPropsType) => {
    const [filter, setFilter] = useState<FilterType>('all')
    const dispatch = useDispatch()

    const filterButtonsData: FilterButtonDataType[] = [
        {id: v1(), title: 'all'},
        {id: v1(), title: 'active'},
        {id: v1(), title: 'completed'},
    ]




    let tasks = useSelector<rootStateType, TaskType[]>(state=>state.tasks[props.toDoListID])
    let filteredTasks: TaskType[] = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter(e => !e.checked)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(e => e.checked)
    }

    const filterAll = useCallback(() => setFilter('all'),[])
    const filterActive = useCallback(() => setFilter('active'),[])
    const filterCompleted = useCallback(() => setFilter('completed'),[])


    const clickToRemoveList = useCallback (() => props.removeList(props.toDoListID),[])
    const addEditedListTitle = useCallback((value: string) => {dispatch(addEditedListTitleAC(value, props.toDoListID))}, [])


    const addTask = useCallback((inputValue: string) => {dispatch(addTaskAC(inputValue, props.toDoListID))}, [])
    const addEditedTask = useCallback((value: string, taskId: string) => {dispatch(addEditedTaskAC(value, props.toDoListID, taskId))}, [])





////////////tasksMAP
    // юзМемо, т.к. у нас 2 компоненты с тудулистом, каждый отрисовывает свои таски(2 разных мапа в двух разных тудулистах)
    // пропсы в каждый тудулист приходят со своими тасками
    // мы меняем стейт только для одного списка тасок из двух, например чек бокс
    // после Апп опять прокидывает списки тасок по тудулистам и т.к. изменения проихошли только в одном списке, второй не мапится
    // т.к. в редьюсере мы возвращаем поверхностную копию всех тасок,
    // вложеные массивы не копируются и при сравнении юзМемо видит тот же массив(массив который не меняли), а на место старого мы вернули копию через метод
    const tasksList = useMemo(()=>{
        return filteredTasks.map((e) => {

            const onChangeHandler = () => dispatch(switchCheckboxAC(e.taskID, e.checked, props.toDoListID))
            const removeTaskHandler = (taskID: string) => dispatch(removeTaskAC(taskID, props.toDoListID))
            console.log('task was mapped')

            return (
                <Task
                    key={e.taskID}
                    type={e.type}
                    checked={e.checked}
                    taskValue={e.taskValue}
                    taskID={e.taskID}
                    onChangeHandler={onChangeHandler}
                    coverAddEditedTask={addEditedTask}
                    removeTaskHandler={removeTaskHandler}
                />)
        })
    }, [filteredTasks])
/////////////tasksMAP done

/////////////tasksButtonsMAP
    //обернул в юзМемо, теперь этот МАР выполнится первый раз при первом ререндере ToDoList
    // а следующий раз\ы только при изменении значения в зависимости(втором аргументе хука([props.filter]))
    // если значение в зависимости не будет изменяться, то юзМемо вернут то что запомнил в первый раз
    const filterButtons = useMemo(()=> {
        return filterButtonsData.map((e,i) => {
            return <FilterButton
                key={i}
                title={e.title}
                callback={e.title === 'all' ? filterAll : e.title === 'active' ? filterActive : filterCompleted}
                cssClass={filter === e.title ? 'filterButton' : ''}
            />
        })
    }, [filter])
/////////////tasksButtonsMAP done

    return (
        <div className="App">
            <div>

                <h3>
                    <EditableSpan value={props.titleList} callback={addEditedListTitle}
                                  itemID={props.toDoListID}/> {/*//передаем туда list айди что бы он мог его вернуть назад*/}
                    <button onClick={clickToRemoveList}>x</button>
                </h3>

                <InputAdd clickToAddTask={addTask}/>

                <ul>
                    {tasksList}
                </ul>

                <div>
                    {filterButtons}
                </div>
            </div>
        </div>
    );
})
