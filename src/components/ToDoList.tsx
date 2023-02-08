import React, {useCallback} from 'react';
import InputAdd from "./InputAdd";
import {EditableSpan} from "./EditableSpan";
import {ToDoListPropsType} from "../Types";


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

////////////map
    const tasksList = props.tasks.map((e) => {

        const onChangeHandler = () => props.switchCheckbox(e.taskID, e.checked, props.toDoListID)

        return (
            <div className={e.checked ? 'isDone' : ''} key={e.taskID}>
                <input type={e.type} checked={e.checked} onChange={onChangeHandler} key={e.taskID}/>
                <EditableSpan value={e.taskValue} callback={coverAddEditedTask}
                              itemID={e.taskID}/> {/*//передаем туда такс айди что бы он мог его вернуть назад*/}
                <button onClick={() => {
                    props.removeTask(e.taskID, props.toDoListID)
                }}> x
                </button>
            </div>
        )
    })
/////////////map done
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
                    <button onClick={filterAll}
                            className={props.filter === 'all' ? 'filterButton' : ''}>All
                    </button>
                    <button onClick={filterActive}
                            className={props.filter === 'active' ? 'filterButton' : ''}>Active
                    </button>
                    <button onClick={filterCompleted}
                            className={props.filter === 'completed' ? 'filterButton' : ''}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
})

