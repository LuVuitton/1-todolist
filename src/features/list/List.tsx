import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {InputAdd} from "../../components/reusedComponents/inputAdd/InputAdd";
import {EditableSpan} from "../../components/reusedComponents/EditableSpan/EditableSpan";
import {CheckStatus, FilterButtonDataType, FilterType, OneTaskType} from "../../Types";
import {FilterButton} from "../../components/FilterButton";
import {Task, taskActionsGroup, taskSelectors} from "../task";
import {v1} from "uuid";
import {useCustomSelector, useActions} from "../../customHooks";
import {listActionsGroup} from "./";
import s from './style.module.css'



export const List: FC<PropsType> = memo(({listID, listTitle, listIsLoading, }) => {
    const {addTask} = useActions(taskActionsGroup)
    const {updateListTitle, deleteAPIListTC} = useActions(listActionsGroup)
    // const tasks = useCustomSelector<OneTaskType[]>(state => state.tasks[props.toDoListID])
    const tasks = useCustomSelector(taskSelectors.selectAllTasks(listID))

    const [filter, setFilter] = useState<FilterType>('all')

    const filterButtonsData: FilterButtonDataType[] = [
        {id: v1(), title: 'all'},
        {id: v1(), title: 'active'},
        {id: v1(), title: 'completed'},
    ]
    const filterBtn = (filter: FilterType) => setFilter(filter)


    let filteredTasks: OneTaskType[] = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter(e => e.status === CheckStatus.New)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(e => e.status === CheckStatus.Completed)
    }


    const removeListHandler = useCallback(() => deleteAPIListTC(listID), [])

    const addTaskHandler = useCallback((title: string) => {
        addTask({listID: listID, title})
    }, [])

    const addEditedListTitle = useCallback((title: string) => {
        updateListTitle({listID: listID, title: title})
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

            return (
                <Task
                    key={e.id}
                    type={'checkbox'}
                    checked={e.status} // передаьб статус
                    taskValue={e.title}
                    taskID={e.id}
                    taskIsLoading={e.taskIsLoading}
                    listID={e.todoListId}
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
                callback={() => filterBtn(e.title)}
                cssClass={filter === e.title ? s.btnFilter : ''}
            />
        })
    }, [filter])
/////////////tasksButtonsMAP done

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan value={listTitle} callback={addEditedListTitle}
                                  itemID={listID}/> {/*//передаем туда list айди что бы он мог его вернуть назад*/}
                    <button disabled={listIsLoading} onClick={removeListHandler}>x</button>
                </h3>

                <InputAdd clickToAddTask={addTaskHandler} disabled={listIsLoading}/>

                <ul>{tasksList}</ul>

                <div>{filterButtons}</div>
            </div>
        </div>
    );
})



type PropsType = {
    listTitle: string,
    listID: string
    listIsLoading: boolean
}
