import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {InputAdd} from "./InputAdd";
import {EditableSpan} from "./EditableSpan";
import {FilterButtonDataType, FilterType, StatusesForTask, ToDoListPropsType} from "../Types";
import {FilterButton} from "./FilterButton";
import {Task} from "./Task";
import {v1} from "uuid";
import {
    addEditedTaskAC,
    switchCheckboxAC
} from "../actionCreators/ActionCreators";
import {OneTaskType} from "../API-Functional/TasksAPI";
import {useCustomSelector} from "../customHooks/CustomHooks";
import {useCustomThunkDispatch} from "../redux/store";
import {deleteTaskTC, getTasksTC, setAPITaskTC, updateAPIEditableSpanTC} from "../redux/reducers/taskReduser";


export const ToDoList = React.memo((props: ToDoListPropsType) => {
    const dispatch = useCustomThunkDispatch()
    // ререндерит (компоненту/все подряд) при изменении (запрашиваемого куска стейта\стейта)
    const tasks = useCustomSelector<OneTaskType[]>(state => state.tasks[props.toDoListID])

    const [filter, setFilter] = useState<FilterType>('all')

    useEffect(() => {
        dispatch(getTasksTC(props.toDoListID))
    }, [])


    const filterButtonsData: FilterButtonDataType[] = [
        {id: v1(), title: 'all'},
        {id: v1(), title: 'active'},
        {id: v1(), title: 'completed'},
    ]


    let filteredTasks: OneTaskType[] = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter(e => e.status === StatusesForTask.New)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(e => e.status === StatusesForTask.Completed)
    }

    const filterAll = useCallback(() => setFilter('all'), [])
    const filterActive = useCallback(() => setFilter('active'), [])
    const filterCompleted = useCallback(() => setFilter('completed'), [])


    const clickToRemoveList = useCallback(() => props.removeList(props.toDoListID), [])
    const addEditedListTitle = useCallback((value: string, taskID:string) => {
        dispatch(updateAPIEditableSpanTC(props.toDoListID, taskID, value))
    }, [])


    const addTask = useCallback((inputValue: string) => {
        dispatch(setAPITaskTC(props.toDoListID, inputValue))
    }, [])

    const addEditedTask = useCallback((value: string, taskId: string) => {
        dispatch(addEditedTaskAC(value, props.toDoListID, taskId))
    }, [])


////////////tasksMAP
    // юзМемо, т.к. у нас 2 компоненты с тудулистом, каждый отрисовывает свои таски(2 разных мапа в двух разных тудулистах)
    // пропсы в каждый тудулист приходят со своими тасками
    // мы меняем стейт только для одного списка тасок из двух, например чек бокс
    // после Апп опять прокидывает списки тасок по тудулистам и т.к. изменения проихошли только в одном списке, второй не мапится
    // т.к. в редьюсере мы возвращаем поверхностную копию всех тасок,
    // вложеные массивы не копируются и при сравнении юзМемо видит тот же массив(массив который не меняли), а на место старого мы вернули копию через метод

    const tasksList = useMemo(() => {

        return filteredTasks.map((e) => {

            const onChangeHandler = () => {
                dispatch(switchCheckboxAC(
                    e.id,
                    e.status,
                    props.toDoListID))
            }
            const removeTaskHandler = (taskID: string) => dispatch(deleteTaskTC(props.toDoListID,taskID))

            return (
                <Task
                    key={e.id}
                    type={'checkbox'}
                    checked={e.status} // передаьб статус
                    taskValue={e.title}
                    taskID={e.id}
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
    const filterButtons = useMemo(() => {
        return filterButtonsData.map((e, i) => {
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

                <ul>{tasksList}</ul>

                <div>{filterButtons}</div>
            </div>
        </div>
    );
})
