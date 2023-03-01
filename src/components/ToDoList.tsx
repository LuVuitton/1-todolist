import React, {useCallback, useMemo} from 'react';
import {InputAdd} from "./InputAdd";
import {EditableSpan} from "./EditableSpan";
import {ToDoListPropsType} from "../Types";
import {FilterButton} from "./FilterButton";
import {Task} from "./Task";


export const ToDoList = React.memo((props: ToDoListPropsType) => {
    console.log('ToDoList')

    const filterAll = () => props.changeFilter('all', props.toDoListID)
    const filterActive = () => props.changeFilter('active', props.toDoListID)
    const filterCompleted = () => props.changeFilter('completed', props.toDoListID)

    const clickToRemoveList = () => props.removeList(props.toDoListID)


    const coverAddTask = useCallback((inputValue: string) => {
        props.addItem(inputValue, props.toDoListID)
    }, [])

    const coverAddEditedTask = useCallback((value: string, taskId: string) => {
        props.addEditedTask(value, props.toDoListID, taskId)
    }, [])

    const coverAddEditedListTitle = useCallback((value: string) => {
        props.addEditedListTitle(value, props.toDoListID)
    }, [])

////////////tasksMAP
    // юзМемо, т.к. у нас 2 компоненты с тудулистом, каждый отрисовывает свои таски(2 разных мапа в двух разных тудулистах)
    // пропсы в каждый тудулист приходят со своими тасками
    // мы меняем стейт только для одного списка тасок из двух, например чек бокс
    // после Апп опять прокидывает списки тасок по тудулистам и т.к. изменения проихошли только в одном списке, второй не мапится
    // т.к. в редьюсере мы возвращаем поверхностную копию всех тасок,
    // вложеные массивы не копируются и при сравнении юзМемо видит тот же массив(массив который не меняли), а на место старого мы вернули копию через метод
    const tasksList = useMemo(()=>{
        return props.tasks.map((e) => {
            const onChangeHandler = () => props.switchCheckbox(e.taskID, e.checked, props.toDoListID)
            const removeTaskHandler = (taskID: string) => props.removeTask(taskID, props.toDoListID)
            console.log('task was mapped')
            return (
                <Task
                    key={e.taskID}
                    type={e.type}
                    checked={e.checked}
                    taskValue={e.taskValue}
                    taskID={e.taskID}
                    onChangeHandler={onChangeHandler}
                    coverAddEditedTask={coverAddEditedTask}
                    removeTaskHandler={removeTaskHandler}
                />)
        })
    }, [props.tasks])
/////////////tasksMAP done

/////////////tasksButtonsMAP
    //обернул в юзМемо, теперь этот МАР выполнится первый раз при первом ререндере ToDoList
    // а следующий раз\ы только при изменении значения в зависимости(втором аргументе хука([props.filter]))
    // если значение в зависимости не будет изменяться, то юзМемо вернут то что запомнил в первый раз
    const filterButtons = useMemo(()=> {
        return props.filterButtonsData.map((e) => {
            return <FilterButton
                key={e.id}
                filter={props.filter}
                title={e.title}
                callback={e.title === 'all' ? filterAll : e.title === 'active' ? filterActive : filterCompleted}
                cssClass={props.filter === e.title ? 'filterButton' : ''}
            />
        })
    }, [props.filter])
/////////////tasksButtonsMAP done

    return (
        <div className="App">
            <div>

                <h3>
                    <EditableSpan value={props.titleList} callback={coverAddEditedListTitle}
                                  itemID={props.toDoListID}/> {/*//передаем туда list айди что бы он мог его вернуть назад*/}
                    <button onClick={clickToRemoveList}>x</button>
                </h3>

                <InputAdd clickToAddTask={coverAddTask}/>

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
