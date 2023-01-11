import React from 'react';
import {FilterType} from "./App";
import InputAdd from "./InputAdd";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    type: string,
    checked: boolean,
    taskValue: string,
    id: string,

}

type propsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, toDoListId: string) => void,
    changeFilter: (value: FilterType, toDoListId:string) => void,
    addItem: (value: string, toDoListId: string) => void,
    switchCheckbox: (taskId: string, checked: boolean, toDoListId: string)=>void,
    filter:FilterType
    toDoListId:string
    removeList:(toDoListId: string)=>void
    addEditedTask:(toDoListId:string, value:string, taskId:string)=>void

}


export function ToDoList(props: propsType) {

////////////
    const tasksList = props.tasks.map((e: any) => {
        const onChangeHandler=()=>{props.switchCheckbox(e.id, e.checked, props.toDoListId)}
        return (
        <div className={e.checked === true?'isDone':''}>

            <input type={e.type} checked={e.checked} onChange={onChangeHandler} key={e.id}/>

            <EditableSpan value={e.taskValue} callback={coverAddEditedTask}/>

            <button onClick={() => {props.removeTask(e.id, props.toDoListId)}}> x </button>
        </div>
        )
    })
/////////////
    const clickToRemoveList =()=> {
            props.removeList(props.toDoListId)
    }
    function filterAll() {
        props.changeFilter('all', props.toDoListId)
    }
    function filterActive() {
        props.changeFilter('active', props.toDoListId)
    }
    function filterCompleted() {
        props.changeFilter('completed', props.toDoListId)
    }

    const coverAddTask = (inputValue:string) => {
        props.addItem(inputValue, props.toDoListId)
    }
    const coverAddEditedTask = (value:string, taskId:string) =>{
        props.addEditedTask(value, props.toDoListId, taskId)
    }


    return (
        <div className="App">
            <div>

                <h3>{props.title} <button onClick={clickToRemoveList}>x</button> </h3>

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

