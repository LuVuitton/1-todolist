import React from 'react';
import {FilterType} from "./App";
import InputAdd from "./InputAdd";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    type: string,
    checked: boolean,
    taskValue: string,
    taskID: string,

}

type propsType = {
    titleList: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, toDoListId: string) => void,
    changeFilter: (value: FilterType, toDoListId:string) => void,
    addItem: (value: string, toDoListId: string) => void,
    switchCheckbox: (taskId: string, checked: boolean, toDoListId: string)=>void,
    filter:FilterType
    toDoListID:string
    removeList:(toDoListId: string)=>void
    addEditedTask:(toDoListId:string, value:string, taskId:string)=>void
    addEditedListTitle:(value:string, toDoListID:string)=>void

}


export function ToDoList(props: propsType) {


    const clickToRemoveList =()=> {
            props.removeList(props.toDoListID)
    }
    function filterAll() {
        props.changeFilter('all', props.toDoListID)
    }
    function filterActive() {
        props.changeFilter('active', props.toDoListID)
    }
    function filterCompleted() {
        props.changeFilter('completed', props.toDoListID)
    }
    const coverAddTask = (inputValue:string) => {
        props.addItem(inputValue, props.toDoListID)
    }
    const coverAddEditedTask = (value:string, taskId:string) =>{
        props.addEditedTask(value, props.toDoListID, taskId)
    }
    const coverAddEditedListTitle = (value:string) =>{
        props.addEditedListTitle(value, props.toDoListID)
    }

////////////
    const tasksList = props.tasks.map((e: any) => {
        const onChangeHandler=()=>{props.switchCheckbox(e.taskID, e.checked, props.toDoListID)}
        return (
            <div className={e.checked === true?'isDone':''}>
                <input type={e.type} checked={e.checked} onChange={onChangeHandler} key={e.taskID}/>
                <EditableSpan value={e.taskValue} callback={coverAddEditedTask} itemID={e.taskID}/>  {/*//передаем туда такс айди что бы он мог его вернуть назад*/}
                <button onClick={() => {props.removeTask(e.taskID, props.toDoListID)}}> x </button>
            </div>
        )
    })
/////////////
    return (
        <div className="App">
            <div>

                <h3>
                    <EditableSpan value={props.titleList} callback={coverAddEditedListTitle} itemID={props.toDoListID}/> {/*//передаем туда list айди что бы он мог его вернуть назад*/}
                    <button onClick={clickToRemoveList}>x</button>
                </h3>

                    <InputAdd clickToAddTask={coverAddTask}/>

                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button onClick={filterAll} className={props.filter==='all'?'filterButton':''}>All
                    </button>
                    <button onClick={filterActive} className={props.filter==='active'?'filterButton':''}>Active
                    </button>
                    <button onClick={filterCompleted}  className={props.filter==='completed'?'filterButton':''}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

