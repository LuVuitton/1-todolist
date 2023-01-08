import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";

export type TaskType = {
    type: string,
    checked: boolean,
    item: string,
    id: string,

}
type propsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, toDoListId: string) => void,
    changeFilter: (value: FilterType, toDoListId:string) => void,
    addTask: (value: string, toDoListId: string) => void,
    switchCheckbox: (taskId: string, checked: boolean, toDoListId: string)=>void,
    filter:FilterType
    toDoListId:string
    removeList:(toDoListId: string)=>void

}


export function ToDoList(props: propsType) {

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<boolean>(false)

    const tasksList = props.tasks.map((e: any) => {
        const onChangeHandler=()=>{props.switchCheckbox(e.id, e.checked, props.toDoListId)}

        return <li className={e.checked === true?'isDone':''}>
            <input type={e.type} checked={e.checked} onChange={onChangeHandler} key={e.id}/>
            <span>{e.item}</span>
            <button onClick={() => {
                props.removeTask(e.id, props.toDoListId)
            }}>x
            </button>
        </li>
    })

    const clickToRemoveList =()=> {
            props.removeList(props.toDoListId)
    }
    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) { //tipizacia slozhno  tdforst03 41:00
        setError(false)
        setInputValue(e.currentTarget.value)
    }
    function pressEnterToAddTask(e: KeyboardEvent<HTMLInputElement>) { // tozhe samoe
        if (e.charCode === 13 && inputValue.trim() !== '') {
            props.addTask(inputValue, props.toDoListId)
            setInputValue('')
        } else if (e.charCode === 13 && inputValue.trim() === '') {
            setInputValue('')
            setError(true)
        }
    }
    function clickToAddTask() {
        if(inputValue.trim() === ''){  //обрезаем пробелы и проверяем на наличие символов
            setInputValue('')
            setError(true)
            return
        }
        props.addTask(inputValue, props.toDoListId)
        setInputValue('')
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


    return (
        <div className="App">
            <div>
                {error &&
                <div>ERROR</div>
                }
                <h3>{props.title} <button onClick={clickToRemoveList}>x</button> </h3>

                <div>
                    <input
                        value={inputValue}
                        onChange={onChangeHandler}
                        onKeyPress={pressEnterToAddTask}
                    />
                    <button onClick={clickToAddTask}>+
                    </button>
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button onClick={filterAll} className={props.filter==='all'?'filterButton':''}>All
                    </button>
                    <button onClick={filterActive} className={props.filter==='active'?'filterButton':''}>Active
                    </button>
                    <button onClick={filterCompleted} className={props.filter==='completed'?'filterButton':''}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

