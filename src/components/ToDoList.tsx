import React, {useCallback} from 'react';
import {InputAdd} from "./InputAdd";
import {EditableSpan} from "./EditableSpan";
import {ToDoListPropsType} from "../Types";
import {FilterButton} from "./FilterButton";
import {Task} from "./Task";


export const ToDoList = React.memo((props: ToDoListPropsType) => {

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
    const tasksList = props.tasks.map((e) => {
        const onChangeHandler = () => props.switchCheckbox(e.taskID, e.checked, props.toDoListID)
        const removeTaskHandler = (taskID: string) => props.removeTask(taskID, props.toDoListID)

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
/////////////tasksMAP done

/////////////tasksButtonsMAP
    const filterButtons = props.filterButtonsData.map((e) => {
        return <FilterButton
            key={e.id}
            filter={props.filter}
            title={e.title}
            callback={e.title === 'all' ? filterAll : e.title === 'active' ? filterActive : filterCompleted}
            cssClass={props.filter === e.title ? 'filterButton' : ''}
        />
    })
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
