import React, {useCallback, useMemo, useState} from 'react';
import {InputAdd} from "../../components/reusedComponents/inputAdd/InputAdd";
import {EditableSpan} from "../../components/reusedComponents/EditableSpan/EditableSpan";
import {CheckStatus, FilterButtonDataType, FilterType, OneTaskType, ToDoListPropsType} from "../../Types";
import {FilterButton} from "../../components/FilterButton";
import {Task, taskActionsGroup, taskSelectors} from "../task";
import {v1} from "uuid";
import {useCustomSelector, useActions} from "../../customHooks";
import {listActionsGroup} from "./";


export const List = React.memo((props: ToDoListPropsType) => {
    const {addTask, switchTaskCheck, removeTask, updateTask} = useActions(taskActionsGroup)
    const {updateListTitle} = useActions(listActionsGroup)
    // const tasks = useCustomSelector<OneTaskType[]>(state => state.tasks[props.toDoListID])
    const tasks = useCustomSelector(taskSelectors.selectAllTasks(props.toDoListID))

    const [filter, setFilter] = useState<FilterType>('all')

    const filterButtonsData: FilterButtonDataType[] = [
        {id: v1(), title: 'all'},
        {id: v1(), title: 'active'},
        {id: v1(), title: 'completed'},
    ]
    const filterBtn = (filter:FilterType)=> setFilter(filter)


    let filteredTasks: OneTaskType[] = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter(e => e.status === CheckStatus.New)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(e => e.status === CheckStatus.Completed)
    }


    const clickToRemoveList = useCallback(() => props.removeList(props.toDoListID), [])

    const addTaskHandler = useCallback((title: string) => {
        addTask({listID: props.toDoListID, title})
    }, [])

    const addEditedListTitle = useCallback((title: string) => {
        updateListTitle({listID: props.toDoListID, title: title})
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

            const onChangeHandler = (check: CheckStatus) => switchTaskCheck({
                taskID: e.id,
                listID: props.toDoListID,
                check
            })

            const removeTaskHandler = (taskID: string) => removeTask({
                listID: props.toDoListID,
                taskID
            })
            const addEditedTask = (title: string) => updateTask({
                listID: props.toDoListID,
                title,
                taskID: e.id
            })



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
                    taskIsLoading={e.taskIsLoading}
                />)
        })
    }, [filteredTasks])
/////////////tasksMAP done

/////////////tasksButtonsMAP
    //обернул в юзМемо, теперь этот МАР выполнится первый раз при первом ререндере ToDoList
    // а следующий раз\ы только при изменении значения в зависимости(втором аргументе хука([props.filter]))
    // если значение в зависимости не будет изменяться, то юзМемо вернут то что запомнил в первый раз
    const filterButtons = useMemo(() => {
        return filterButtonsData.map(e => {
            return <FilterButton
                key={e.id}
                title={e.title}
                callback={()=>filterBtn(e.title)}
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
                    <button disabled={!props.listIsLoading} onClick={clickToRemoveList}>x</button>
                </h3>

                <InputAdd clickToAddTask={addTaskHandler} disabled={!props.listIsLoading} />

                <ul>{tasksList}</ul>

                <div>{filterButtons}</div>
            </div>
        </div>
    );
})
