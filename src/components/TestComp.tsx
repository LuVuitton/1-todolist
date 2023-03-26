import React, {ChangeEvent, useEffect, useState} from 'react';
import {toDoListsAPI} from "../API-Functional/ToDoListsAPI";
import {tasksAPI} from "../API-Functional/TasksAPI";


export const TestComp = () => {
    const testDivStyles = {
        border: 'red solid 3px',
        minWidth: '250px',
        minHeight: '250px',
    }


    const tasksDemo = ['test task 1','test task 2', 'test task 3']

    const [tasks, setTasks] = useState([])
    const [toDoLists, setToDoLists] = useState<any>(null)
    const [check, setCheck] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [arrID, setArrID] = useState<Array<string>>([])

    useEffect(() => {
        toDoListsAPI.getLists().then((r) => {
            setArrID(r.map((e) => e.id))
            setToDoLists(r.map((e, i: number) => <div key={i}> <h3>{e.title}</h3> <div> {tasksDemo.map((e,i)=><div key={i}> {e}</div>)} </div> </div>))
        })
    }, [check])

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }


    const postListHandler = () => {
        toDoListsAPI.postList(inputValue).then(() => setCheck(!check))
        setInputValue('')
    }
    const deleteLastList = () => {
        toDoListsAPI.deleteList(arrID[0]).then(() => setCheck(!check))
    }
    const renameLastList = ()=> {
        toDoListsAPI.renameList(arrID[0], 'new title').then(()=> setCheck(!check))
    }


    const getTasks = ()=> {
        tasksAPI.getTasks(arrID[0]).then(r=>{
            console.log(r)
        })
    }
    const postTask = ()=> {
        tasksAPI.postTask(arrID[0], 'new task')
    }


    return (
        <>

        <div style={testDivStyles}>
            <input type="text" value={inputValue} onChange={inputChangeHandler}/>
            <button onClick={postListHandler}>post list</button>
            <div>
                <button onClick={deleteLastList}>delete last list</button>
                <button onClick={renameLastList}>rename last list</button>
            </div>
            {toDoLists}
        </div>
        <div>
            <button onClick={getTasks}>GET TASKS</button>
            <button onClick={postTask}>POST TASKS</button>
        </div>
        </>)
}
