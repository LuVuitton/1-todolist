import React, {useState} from 'react';
import {FilterType} from "./App";
import InputAdd from "./InputAdd";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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

}


export function ToDoList(props: propsType) {


    const tasksList = props.tasks.map((e: any) => {
        const onChangeHandler=()=>{props.switchCheckbox(e.id, e.checked, props.toDoListId)}

        return <li className={e.checked === true?'isDone':''}>
            <input type={e.type} checked={e.checked} onChange={onChangeHandler} key={e.id}/>
            <span>{e.taskValue} </span>

            <IconButton aria-label="delete" // материал юай, атрибут вариант оттуда
                        onClick={() => {
                props.removeTask(e.id, props.toDoListId)
            }}>
                <Delete />
            </IconButton>
        </li>
    })

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


    return (
        <div className="App">
            <div>

                <h3>{props.title} <IconButton onClick={clickToRemoveList}><Delete /></IconButton> </h3>

                    <InputAdd clickToAddTask={coverAddTask}/>

                <ul>
                    {tasksList}
                </ul>
                <div>
                    <Button onClick={filterAll} variant={props.filter==='all'?'contained':'outlined'}>All
                    </Button>
                    <Button onClick={filterActive} variant={props.filter==='active'?'contained':'outlined'}>Active
                    </Button>
                    <Button onClick={filterCompleted}  variant={props.filter==='completed'?'contained':'outlined'}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
}

